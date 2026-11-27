export default function IssueTypesCard({ issues, total }) {
  const barColors = [
    'bg-danger',
    'bg-warning',
    'bg-primary',
    'bg-success',
  ]

  return (
    <section className="flex min-w-0 flex-col gap-[18px] rounded-2xl border border-slate-200 bg-white p-card shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Active issue types
        </h2>

        <p className="mt-1 text-[13px] leading-[1.45] text-slate-500">
          {total} verified road issues
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {issues.map((issue, index) => (
          <div key={issue.label} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-700">
                {issue.label}
              </span>

              <span className="text-xs font-semibold text-slate-700 tabular-nums">
                {issue.count}
              </span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label={`${issue.label} percentage`}
              aria-valuenow={issue.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full rounded-full transition-all ${barColors[index]}`}
                style={{ width: `${issue.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-auto border-t border-slate-100 pt-3 text-xs leading-[1.45] text-slate-500">
        Prioritize safety risks first, then scheduled maintenance.
      </p>
    </section>
  )
}