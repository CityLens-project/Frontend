
import { CheckCircle2 } from 'lucide-react'

export default function PredictionCoverage({ data }) {
  const details = [
    { label: 'Area', value: data.area },
    { label: 'Forecast window', value: data.forecastWindow },
    { label: 'Refresh', value: data.refresh },
  ]

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-semibold text-slate-800">
        Prediction coverage
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        What this forecast includes
      </p>

      <div className="mt-4 divide-y divide-slate-100">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex flex-wrap justify-between gap-2 py-3 text-[11px]"
          >
            <span className="text-slate-500">{item.label}</span>

            <span className="font-semibold text-slate-700">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-3 text-[11px] text-slate-500">
          Roads included
        </p>

        <div className="flex flex-wrap gap-2">
          {data.roads.map((road) => (
            <span
              key={road}
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1.5 text-[10px] font-medium text-slate-600"
            >
              <CheckCircle2 size={11} className="text-emerald-500" />
              {road}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-4 text-slate-400">
        Roads not listed here are not part of this forecast.
      </p>
    </section>
  )
}
