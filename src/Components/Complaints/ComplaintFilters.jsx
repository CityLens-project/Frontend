import { CalendarDays, ChevronDown, Search } from 'lucide-react'

const dateInputClass =
  'h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'

function SelectBox({ icon: Icon, label, value, onChange, children }) {
  return (
    <label className="relative inline-flex h-11 grow items-center rounded-lg border border-slate-200 bg-white text-secondary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 sm:grow-0">
      <Icon size={18} aria-hidden="true" className="pointer-events-none absolute left-[18px]" />
      <select
        aria-label={label}
        value={value}
        onChange={onChange}
        className="h-full w-full cursor-pointer appearance-none bg-transparent pl-11 pr-[18px] text-sm font-semibold outline-none"
      >
        {children}
      </select>
    </label>
  )
}

export default function ComplaintFilters({ filters, districts, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex h-11 min-w-full flex-1 items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 sm:min-w-[260px]">
        <Search size={18} className="shrink-0 text-slate-500" aria-hidden="true" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search reference or complaint"
          aria-label="Search reference or complaint"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-800 outline-none placeholder:text-slate-500"
        />
      </label>

      <SelectBox
        icon={ChevronDown}
        label="District"
        value={filters.district}
        onChange={(e) => onChange({ district: e.target.value })}
      >
        <option value="all">All districts</option>
        {districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </SelectBox>

      <SelectBox
        icon={CalendarDays}
        label="Date range"
        value={filters.range}
        onChange={(e) => onChange({ range: e.target.value })}
      >
        <option value="all">All time</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="custom">Custom range</option>
      </SelectBox>

      {filters.range === 'custom' && (
        <>
          <input
            type="date"
            aria-label="From date"
            value={filters.from}
            max={filters.to || undefined}
            onChange={(e) => onChange({ from: e.target.value })}
            className={dateInputClass}
          />
          <input
            type="date"
            aria-label="To date"
            value={filters.to}
            min={filters.from || undefined}
            onChange={(e) => onChange({ to: e.target.value })}
            className={dateInputClass}
          />
        </>
      )}
    </div>
  )
}