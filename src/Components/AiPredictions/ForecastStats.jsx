
import {
  Activity,
  MapPin,
  Route,
  RefreshCw,
} from 'lucide-react'
import StatCard from '../Dashboard/StatCard'

const icons = {
  confidence: Activity,
  hotspots: MapPin,
  saving: Route,
  refresh: RefreshCw,
}

const iconColors = {
  confidence: 'text-emerald-500',
  hotspots: 'text-amber-500',
  saving: 'text-primary',
  refresh: 'text-primary',
}

export default function ForecastStats({ stats }) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.type}
          label={stat.label}
          value={stat.value}
          context={stat.context}
          icon={icons[stat.type]}
          iconClassName={iconColors[stat.type]}
        />
      ))}
    </section>
  )
}
