import { ComplaintStatus } from '../../Constants/complaintStatus'

const tabs = [
  { value: 'all', label: 'All complaints' },
  ...Object.entries(ComplaintStatus).map(([value, { label }]) => ({ value, label })),
]

export default function ComplaintTabs({ active, counts, onChange }) {
  return (
    <div className="border-b border-slate-200">
      <nav aria-label="Complaint status" className="-mb-px flex gap-7 overflow-x-auto">
        {tabs.map(({ value, label }) => {
          const isActive = value === active
          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              aria-current={isActive ? 'true' : undefined}
              className={`whitespace-nowrap border-b-2 pb-3 text-[13px] transition-colors ${
                isActive
                  ? 'border-primary font-semibold text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {label} <span className="ml-1">{counts[value]}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}