import { Car, CircleCheck, MessageSquare, TriangleAlert } from 'lucide-react'
import PageHeading from '../../Components/Dashboard/PageHeading'
import StatCard from '../../Components/Dashboard/StatCard'
import TrafficChart from '../../Components/Overview/TrafficChart'
import RoadHealthCard from '../../Components/Overview/RoadHealthCard'
import RecentComplaints from '../../Components/Overview/RecentComplaints'
import { overviewData } from '../../Data/overview'

const statIcons = {
  avgSpeed: { icon: Car, className: 'text-primary' },
  roadsNeedingAttention: { icon: TriangleAlert, className: 'text-warning' },
  openComplaints: { icon: MessageSquare, className: 'text-primary' },
  reportsResolved: { icon: CircleCheck, className: 'text-success' },
}

export default function Overview() {
  const { stats, trafficSeries, roadHealth, recentComplaints } = overviewData

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="City overview"
        description="A clear picture of Sadat City. Focus on what needs your attention."
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ id, ...stat }) => (
          <StatCard
            key={id}
            {...stat}
            icon={statIcons[id].icon}
            iconClassName={statIcons[id].className}
          />
        ))}
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <TrafficChart data={trafficSeries} />
        <RoadHealthCard {...roadHealth} />
      </div>

      <RecentComplaints
        complaints={recentComplaints.items}
        total={recentComplaints.total}
      />
    </div>
  )
}

