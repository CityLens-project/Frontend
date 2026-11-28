import { ChevronDown, RotateCcw } from 'lucide-react'

import {
  DISTRICTS,
  TRAFFIC_STATUSES,
  DAMAGE_SEVERITIES,
} from '../../Data/smartMap'

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="relative flex h-11 min-w-0 items-center rounded-lg border border-slate-200 bg-white">
      <span className="sr-only">{label}</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full cursor-pointer appearance-none bg-transparent pl-3 pr-9 text-sm text-slate-700 outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 text-slate-500"
      />
    </label>
  )
}

export default function MapFilters({
  filters,
  onFilterChange,
  onReset,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <span className="mr-1 text-sm font-semibold text-slate-800">
        Filters
      </span>

      <FilterSelect
        label="District"
        value={filters.district}
        options={DISTRICTS}
        onChange={(value) => onFilterChange('district', value)}
      />

      <FilterSelect
        label="Date"
        value={filters.date}
        options={['Today', 'Yesterday', 'Last 7 days']}
        onChange={(value) => onFilterChange('date', value)}
      />

      <FilterSelect
        label="Traffic status"
        value={filters.traffic}
        options={TRAFFIC_STATUSES}
        onChange={(value) => onFilterChange('traffic', value)}
      />

      <FilterSelect
        label="Damage severity"
        value={filters.damage}
        options={DAMAGE_SEVERITIES}
        onChange={(value) => onFilterChange('damage', value)}
      />

      <button
        type="button"
        onClick={onReset}
        className="ml-auto inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <RotateCcw size={14} />
        Reset filters
      </button>
    </div>
  )
}
