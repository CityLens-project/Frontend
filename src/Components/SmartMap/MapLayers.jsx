import {
  Activity,
  AlertTriangle,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

const layerItems = [
  {
    id: 'traffic',
    title: 'Traffic',
    description: 'Clear, moderate and heavy roads',
    color: 'bg-emerald-500',
    icon: Activity,
  },
  {
    id: 'roadConditions',
    title: 'Road conditions',
    description: 'Detected issues and severity',
    color: 'bg-red-500',
    icon: AlertTriangle,
  },
  {
    id: 'complaints',
    title: 'Citizen complaints',
    description: 'Approved citizen complaints',
    color: 'bg-blue-600',
    icon: MessageSquare,
  },
  {
    id: 'predictions',
    title: 'AI predictions',
    description: 'Expected congestion areas',
    color: 'bg-amber-600',
    icon: Sparkles,
  },
]

export default function MapLayers({ layers, onToggle }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="font-semibold text-slate-900">Map layers</h2>
      <p className="mt-1 text-xs text-slate-500">
        Show or hide information on the map
      </p>

      <div className="mt-3 divide-y divide-slate-100">
        {layerItems.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 py-3"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`} />

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Icon size={14} className="text-slate-500" />
                    <h3 className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={layers[item.id]}
                aria-label={`Toggle ${item.title}`}
                onClick={() => onToggle(item.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  layers[item.id] ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    layers[item.id] ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
