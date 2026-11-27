import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Gauge,
  MapPin,
} from 'lucide-react'

export default function NextStepCard({ data }) {
  const navigate = useNavigate()

const handleRecommend = () => {
  navigate('/dashboard/decision-support', {
    state: {
      recommendation: data,
    },
  })
}
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:p-5">
      <div>
        <h2 className="text-sm font-semibold text-slate-800">
          A useful next step
        </h2>

        <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-800">
          <Sparkles size={15} className="text-emerald-500" />
          {data.road}
        </p>
      </div>

      <div>
        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold text-amber-700">
          {data.level} congestion expected
        </span>

        <p className="mt-3 text-xs leading-6 text-slate-600">
          {data.description}
        </p>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-white p-3">
        <h3 className="mb-3 text-xs font-semibold text-slate-700">
          Why this route?
        </h3>

        <div className="flex gap-2.5">
          <span className="flex h-fit shrink-0 items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-600">
            <Sparkles size={11} />
            AI forecast
          </span>

          <p className="text-[11px] leading-5 text-slate-600">
            {data.road} is expected to be busy between {data.expectedTime}
            {' '}({data.confidence} confidence).
          </p>
        </div>

        <div className="mt-3 flex gap-2.5">
          <span className="flex h-fit shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[9px] font-semibold text-slate-600">
            <Gauge size={11} />
            Current data
          </span>

          <p className="text-[11px] leading-5 text-slate-600">
            {data.alternativeRoad} is currently clear at {data.currentSpeed}.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-[11px]">
          <span className="w-24 shrink-0 text-slate-600">Main road</span>

          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-full rounded-full bg-amber-500" />
          </div>

          <span className="font-semibold text-slate-600">
            {data.originalDuration} min
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="w-24 shrink-0 text-slate-600">Alternative</span>

          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-3/4 rounded-full bg-emerald-500" />
          </div>

          <span className="font-semibold text-slate-600">
            {data.alternativeDuration} min
          </span>
        </div>
      </div>

      <p className="text-xs font-semibold text-emerald-700">
        {data.alternativeDuration} min route · Save {data.savedTime} min
      </p>

      <button
        type="button"
        onClick={handleRecommend}
        className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
      >
        <MapPin size={15} />
        View recommended route
        <ArrowRight size={13} />
      </button>

      <p className="text-[10px] leading-4 text-slate-500">
        Based on observed traffic, time of day and recent road reports.
      </p>
    </section>
  )
}
