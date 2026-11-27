import { Link } from 'react-router-dom'
import Badge from '../Dashboard/Badge'
import cityMap from '../../assets/Sadat City Traffic Map Infographic.png'

export default function RoadHealthCard({ activeIssues, highPriority }) {
  return (
    <section className="flex min-w-0 flex-col gap-[18px] rounded-2xl border border-slate-200 bg-white p-card shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Road health snapshot</h2>
      <p className="text-[13px] leading-[1.45] text-slate-500">
        {activeIssues} active road issues across Sadat City
      </p>

      <img
        src={cityMap}
        alt="Map of Sadat City with traffic and road issues"
        className="h-52 w-full rounded-2xl object-cover"
      />

      <div className="flex items-center justify-between">
        <Badge tone="danger">{highPriority} high priority</Badge>
        <Link
          to="/dashboard/smart-map"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Open map →
        </Link>
      </div>
    </section>
  )
}