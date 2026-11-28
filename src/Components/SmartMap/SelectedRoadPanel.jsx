import { X, MapPin } from 'lucide-react'
import RoadDetails from './RoadDetails'

export default function SelectedRoadPanel({ road, onClose }) {
  return (
    <div className="min-h-[250px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Selected road
        </span>

        {road && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close selected road"
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {road ? (
        <>
          <div className="mb-3">
            <h2 className="text-lg font-bold text-slate-900">
              {road.name}
            </h2>

            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={12} />
              {road.district}
            </p>
          </div>

          <RoadDetails road={road} />
        </>
      ) : (
        <div className="flex min-h-44 flex-col items-center justify-center text-center">
          <MapPin size={25} className="mb-2 text-slate-300" />
          <p className="text-sm font-medium text-slate-600">
            No road selected
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Click any road on the map to view its details.
          </p>
        </div>
      )}
    </div>
  )
}
