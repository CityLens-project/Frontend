
import { ArrowDown, ArrowUp, Minus, Sparkles } from 'lucide-react'

const levelStyles = {
  High: 'bg-rose-100 text-rose-700',
  Moderate: 'bg-amber-100 text-amber-700',
  Low: 'bg-emerald-100 text-emerald-700',
  'No reading': 'bg-slate-100 text-slate-500',
}

function LevelBadge({ level }) {
  return (
    <span
      className={`inline-flex min-w-[76px] justify-center rounded-full px-2 py-1 text-[10px] font-semibold ${levelStyles[level] || levelStyles['No reading']}`}
    >
      {level}
    </span>
  )
}

function ChangeLabel({ direction, text }) {
  const styles = {
    up: 'text-rose-600',
    down: 'text-emerald-600',
    neutral: 'text-slate-500',
  }

  const Icon =
    direction === 'up'
      ? ArrowUp
      : direction === 'down'
        ? ArrowDown
        : Minus

  return (
    <span className={`flex items-center gap-1 text-[10px] ${styles[direction]}`}>
      <Icon size={12} />
      {text}
    </span>
  )
}

export default function CongestionComparison({ data }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-800">
          Current vs predicted congestion
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          How conditions are expected to change over the next 6 hours
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-[10px] text-slate-500">Citywide index now</p>

          <span className="mt-2 block text-2xl font-bold text-slate-800">
            {data.current.value} / 100
          </span>

          <p className="mt-1 text-[10px] text-slate-500">
            {data.current.level}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <p className="text-[10px] text-slate-500">Predicted peak</p>

            <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-600">
              <Sparkles size={10} />
              AI forecast
            </span>
          </div>

          <span className="mt-2 block text-2xl font-bold text-slate-800">
            ≈ {data.predicted.value} / 100
          </span>

          <p className="mt-1 text-[10px] text-slate-500">
            {data.predicted.time}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_76px_16px_76px_minmax(0,1fr)] items-center gap-2 border-b border-slate-100 pb-2 text-[10px] text-slate-400">
        <span>Road</span>
        <span>Now</span>
        <span />
        <span>Predicted</span>
        <span>Change</span>
      </div>

      <div className="divide-y divide-slate-100">
        {data.roads.map((road) => (
          <div
            key={road.name}
            className="grid min-h-[58px] grid-cols-[minmax(0,1fr)_76px_16px_76px_minmax(0,1fr)] items-center gap-2 py-2"
          >
            <span className="text-[10px] font-semibold leading-4 text-slate-700">
              {road.name}
            </span>

            <LevelBadge level={road.current} />

            <span className="text-center text-xs text-slate-400">→</span>

            <LevelBadge level={road.predicted} />

            <ChangeLabel
              direction={road.direction}
              text={road.change}
            />
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] leading-4 text-slate-400">
        High is shown as High and Clear as Low so current and predicted levels can be compared.
      </p>
    </section>
  )
}
