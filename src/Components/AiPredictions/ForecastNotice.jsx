
import { Info } from 'lucide-react'

export default function ForecastNotice() {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
      <Info size={16} className="mt-0.5 shrink-0 text-slate-400" />

      <p className="leading-5">
        AI forecasts are estimates. Unexpected incidents, weather or roadworks
        can change actual conditions.
      </p>
    </div>
  )
}
