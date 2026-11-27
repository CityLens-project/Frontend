const conditionItems = [
  {
    key: 'damaged',
    label: 'Damaged',
    color: 'bg-danger',
  },
  {
    key: 'maintenance',
    label: 'Maintenance',
    color: 'bg-warning',
  },
  {
    key: 'good',
    label: 'Good condition',
    color: 'bg-success',
  },
]

export default function RoadConditionSummary() {
  return (
    <section className="flex min-w-0 flex-col gap-[18px] rounded-2xl border border-slate-200 bg-white p-card shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Reported road issues
        </h2>

        <p className="mt-1 text-[13px] leading-[1.45] text-slate-500">
          Select a marker to see its report and repair status.
        </p>
      </div>

      {/* Reserved map area for future GIS integration */}
      <div
        role="region"
        aria-label="Reserved map area for future GIS integration"
        className="h-[164px] w-full rounded-xl bg-[#eef2ed] sm:h-[180px]"
      />

      <div className="flex flex-wrap items-center gap-3">
        {conditionItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center gap-1.5 rounded-full border border-slate-100 px-2.5 py-1.5"
          >
            <span className={`h-2 w-2 rounded-full ${item.color}`} />

            <span className="text-[11px] font-medium text-slate-600">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}