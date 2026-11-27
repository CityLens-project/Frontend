
const trafficStyles = {
  High: 'bg-rose-100 text-rose-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
}

function TrafficBadge({ level }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${trafficStyles[level]}`}
    >
      {level}
    </span>
  )
}

function ConfidenceBar({ value }) {
  const color =
    value >= 85
      ? 'bg-emerald-500'
      : value >= 75
        ? 'bg-blue-500'
        : 'bg-slate-400'

  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-xs font-medium text-slate-600">
        {value}%
      </span>

      <div className="h-1.5 w-10 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function PredictedHotspots({ hotspots }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Predicted road hotspots
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Use these estimates to support, not replace, local judgment.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600">
          AI forecast
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50 text-[10px] text-slate-500">
            <tr>
              <th className="rounded-l-lg px-3 py-3 font-medium">Road</th>
              <th className="px-3 py-3 font-medium">Time window</th>
              <th className="px-3 py-3 font-medium">Expected traffic</th>
              <th className="px-3 py-3 font-medium">Confidence</th>
              <th className="rounded-r-lg px-3 py-3 font-medium">Suggested action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {hotspots.map((item) => (
              <tr key={item.id} className="h-14 hover:bg-slate-50">
                <td className="px-3 text-[11px] font-semibold text-slate-700">
                  {item.road}
                </td>

                <td className="px-3 text-[11px] text-slate-500">
                  {item.time}
                </td>

                <td className="px-3">
                  <TrafficBadge level={item.traffic} />
                </td>

                <td className="px-3">
                  <ConfidenceBar value={item.confidence} />
                </td>

                <td className="px-3 text-[11px] text-slate-500">
                  {item.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-3">
        <div>
          <span className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
            <span className="h-1.5 w-5 rounded-full bg-emerald-500" />
            High · 85% and above
          </span>
          <p className="mt-1 pl-7 text-[10px] text-slate-400">
            Most reliable, plan around it
          </p>
        </div>

        <div>
          <span className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
            <span className="h-1.5 w-5 rounded-full bg-blue-500" />
            Medium · 75–84%
          </span>
          <p className="mt-1 pl-7 text-[10px] text-slate-400">
            A good guide, recheck closer to the time
          </p>
        </div>

        <div>
          <span className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
            <span className="h-1.5 w-5 rounded-full bg-slate-400" />
            Lower · below 75%
          </span>
          <p className="mt-1 pl-7 text-[10px] text-slate-400">
            Treat as a rough estimate
          </p>
        </div>
      </div>
    </section>
  )
}
