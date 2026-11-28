import { Gauge,MessageSquare, Sparkles } from 'lucide-react'

const trafficStyles = {
  Clear: 'bg-emerald-50 text-emerald-700',
  Moderate: 'bg-amber-50 text-amber-700',
  Heavy: 'bg-red-50 text-red-700',
}

const damageStyles = {
  Low: 'bg-emerald-50 text-emerald-700',
  Medium: 'bg-amber-50 text-amber-700',
  High: 'bg-red-50 text-red-700',
}

function DetailRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-slate-100 py-3">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-right text-xs font-semibold text-slate-800">
        {children}
      </span>
    </div>
  )
}

export default function RoadDetails({ road }) {
  const speedDifference = road.speed - road.typicalSpeed

  return (
    <div>
      <div className="mb-3">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${trafficStyles[road.traffic]}`}>
          {road.traffic} traffic
        </span>
      </div>

      <DetailRow label="Average speed">
        <span className="inline-flex items-center gap-1">
          <Gauge size={13} />
          {road.speed} km/h
        </span>
      </DetailRow>

      <DetailRow label="Vs. typical">
        <span className={speedDifference < 0 ? 'text-red-600' : 'text-emerald-600'}>
          {speedDifference > 0 ? '+' : ''}
          {speedDifference} km/h
        </span>
      </DetailRow>

      <DetailRow label="Road damage">
        <span className="inline-flex items-center gap-1">
          <span>{road.damageType}</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] ${damageStyles[road.damage]}`}>
            {road.damage}
          </span>
        </span>
      </DetailRow>

      <DetailRow label="Citizen complaints">
        <span className="inline-flex items-center gap-1">
          <MessageSquare size={13} />
          {road.complaints} {road.complaints === 1 ? 'complaint' : 'complaints'}
        </span>
      </DetailRow>

      {road.complaintId && (
        <DetailRow label="Latest complaint">
          {road.complaintId} · {road.complaintStatus}
        </DetailRow>
      )}

      <DetailRow label="AI forecast">
        <span className="inline-flex items-center gap-1">
          <Sparkles size={13} />
          {road.forecast} · {road.forecastTime}
        </span>
      </DetailRow>

      <DetailRow label="Forecast confidence">
        {road.confidence}%
      </DetailRow>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        Forecasts are estimates. Select another road to see its details.
      </p>
    </div>
  )
}
