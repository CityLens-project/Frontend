import { Search, RotateCcw } from 'lucide-react'
import Badge from '../Dashboard/Badge'
import Button from '../Dashboard/Button'
import Pagination from '../Dashboard/Pagination'
import { RoadCondition, RoadPriority, ROAD_CONDITION_OPTIONS, ROAD_PRIORITY_OPTIONS } from '../../Constants/roadCondition'

const inputClassName =
  'h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10'

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-xs font-medium text-slate-500">{label}</span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClassName}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function PriorityBadge({ priority }) {
  const config = RoadPriority[priority]

  if (priority === 'low') {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
        {config.label}
      </span>
    )
  }

  return <Badge tone={config.tone}>{config.label}</Badge>
}

export default function RoadRegister({
  roads,
  total,
  filters,
  onFiltersChange,
  page,
  pageSize,
  onPageChange,
}) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.condition !== 'all' ||
    filters.priority !== 'all'

  const resetFilters = () => {
    onFiltersChange({
      search: '',
      condition: 'all',
      priority: 'all',
    })
  }

  return (
    <section className="flex min-w-0 flex-col gap-[18px] rounded-2xl border border-slate-200 bg-white p-card shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Road register
        </h2>
        <p className="mt-1 text-[13px] leading-[1.45] text-slate-500">
          Review road conditions and maintenance priorities across Sadat City.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(220px,1.5fr)_minmax(150px,1fr)_minmax(150px,1fr)_auto] md:items-end">
        <label className="flex min-w-0 flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-500">
            Search roads
          </span>

          <div className="relative">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <input
              type="search"
              value={filters.search}
              onChange={(event) =>
                onFiltersChange({ search: event.target.value })
              }
              placeholder="Road name, district or reference..."
              className={`${inputClassName} pl-9`}
              aria-label="Search roads by name, district or reference"
            />
          </div>
        </label>

        <FilterSelect
          label="Condition"
          value={filters.condition}
          options={ROAD_CONDITION_OPTIONS}
          onChange={(condition) => onFiltersChange({ condition })}
        />

        <FilterSelect
          label="Priority"
          value={filters.priority}
          options={ROAD_PRIORITY_OPTIONS}
          onChange={(priority) => onFiltersChange({ priority })}
        />

        <Button
          icon={RotateCcw}
          onClick={resetFilters}
          disabled={!hasActiveFilters}
          className="w-full md:w-auto"
        >
          Reset
        </Button>
      </div>

      <div className="min-w-0 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200">
              {[
                'Reference',
                'Road',
                'District',
                'Issue type',
                'Condition',
                'Priority',
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-3 py-3 text-xs font-semibold text-slate-500 first:pl-0 last:pr-0"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {roads.length > 0 ? (
              roads.map((road) => (
                <tr
                  key={road.id}
                  className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/70"
                >
                  <td className="whitespace-nowrap py-4 pl-0 pr-3 text-xs font-semibold text-primary">
                    {road.reference}
                  </td>

                  <td className="max-w-[230px] py-4 px-3">
                    <span className="block truncate text-sm font-semibold text-slate-800">
                      {road.name}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600">
                    {road.district}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600">
                    {road.issueType ?? '—'}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4">
                    <Badge tone={RoadCondition[road.condition].tone}>
                      {RoadCondition[road.condition].label}
                    </Badge>
                  </td>

                  <td className="whitespace-nowrap py-4 pl-3 pr-0">
                    <PriorityBadge priority={road.priority} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    No roads found
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Try changing your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
        itemLabel="roads"
      />
    </section>
  )
}