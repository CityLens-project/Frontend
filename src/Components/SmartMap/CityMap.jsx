import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

import ComplaintMarker from './ComplaintMarker'
import PredictionMarker from './PredictionMarker'

import {
  complaints,
  predictions,
} from '../../Data/smartMap'

const trafficColors = {
  Clear: '#059669',
  Moderate: '#F59E0B',
  Heavy: '#EF4444',
}

export default function CityMap({
  roads,
  layers,
  selectedRoad,
  onRoadSelect,
}) {
  const [zoom, setZoom] = useState(1)

  const visibleComplaints = complaints.filter((item) =>
    roads.some((road) => road.id === item.roadId)
  )

  const visiblePredictions = predictions.filter((item) =>
    roads.some((road) => road.id === item.roadId)
  )

  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">Sadat City</h2>
          <p className="mt-1 text-xs text-slate-500">
            Showing {roads.length} selected roads · Updated just now
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Live traffic
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-slate-100">
        <div className="absolute right-3 top-3 z-10 flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((prev) => Math.min(prev + 0.15, 1.6))}
            className="flex h-9 w-9 items-center justify-center text-slate-700 hover:bg-slate-50"
          >
            <Plus size={17} />
          </button>

          <div className="h-px bg-slate-200" />

          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((prev) => Math.max(prev - 0.15, 0.8))}
            className="flex h-9 w-9 items-center justify-center text-slate-700 hover:bg-slate-50"
          >
            <Minus size={17} />
          </button>
        </div>

        <svg
          viewBox="0 0 820 520"
          className="block h-auto w-full"
          role="img"
          aria-label="Schematic map of selected roads in Sadat City"
        >
          <defs>
            <pattern
              id="mapGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#E7EDF4"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>

          <rect width="820" height="520" fill="#E9EFF6" />
          <rect width="820" height="520" fill="url(#mapGrid)" />

          <rect x="600" y="0" width="42" height="520" fill="#CDE4F8" />

          {[
            [30, 30, 110, 115],
            [135, 30, 110, 115],
            [280, 30, 150, 115],
            [465, 30, 110, 115],
            [650, 30, 65, 115],
            [730, 30, 60, 115],
            [135, 210, 110, 85],
            [280, 210, 140, 85],
            [465, 210, 115, 85],
            [650, 210, 65, 85],
            [730, 210, 60, 85],
            [30, 410, 180, 80],
            [280, 410, 150, 80],
            [465, 410, 110, 80],
            [650, 410, 65, 80],
            [730, 410, 60, 80],
          ].map(([x, y, width, height], index) => (
            <rect
              key={index}
              x={x}
              y={y}
              width={width}
              height={height}
              rx="9"
              fill="#F8FAFC"
            />
          ))}

          <rect
            x="310"
            y="150"
            width="145"
            height="55"
            rx="8"
            fill="#D6F0E1"
          />

          <g transform={`translate(410 260) scale(${zoom}) translate(-410 -260)`}>
            {roads.map((road) => {
              const isSelected = selectedRoad?.id === road.id
              const color = layers.traffic
                ? trafficColors[road.traffic]
                : '#94A3B8'

              return (
                <g
                  key={road.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${road.name}`}
                  onClick={() => onRoadSelect(road)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onRoadSelect(road)
                    }
                  }}
                  className="cursor-pointer"
                >
                  <polyline
                    points={road.points}
                    fill="none"
                    stroke={isSelected ? '#BFDBFE' : '#FFFFFF'}
                    strokeWidth={isSelected ? 18 : 14}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <polyline
                    points={road.points}
                    fill="none"
                    stroke={color}
                    strokeWidth={isSelected ? 7 : 5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <polyline
                    points={road.points}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="25"
                  />
                </g>
              )
            })}

            {layers.roadConditions && roads.map((road) => {
              if (road.damage === 'Low') return null

              const position = {
                1: [365, 180],
                2: [260, 325],
                3: [450, 285],
                4: [565, 380],
                5: [680, 235],
              }[road.id]

              if (!position) return null

              return (
                <g key={road.id}>
                  <circle
                    cx={position[0]}
                    cy={position[1]}
                    r="11"
                    fill={road.damage === 'High' ? '#EF4444' : '#F59E0B'}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={position[0]}
                    y={position[1] + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    !
                  </text>
                </g>
              )
            })}

            {layers.complaints && visibleComplaints.map((item) => (
              <ComplaintMarker
                key={item.id}
                x={item.x}
                y={item.y}
              />
            ))}

            {layers.predictions && visiblePredictions.map((item) => (
              <PredictionMarker
                key={item.id}
                x={item.x}
                y={item.y}
                confidence={item.confidence}
              />
            ))}
          </g>
        </svg>

        <div className="absolute bottom-3 left-4 rounded bg-white/90 px-2 py-1 text-[10px] text-slate-500">
          Schematic map · Not to scale
        </div>
      </div>

      {roads.length === 0 && (
        <p className="py-5 text-center text-sm text-slate-500">
          No roads match the selected filters.
        </p>
      )}
    </div>
  )
}
