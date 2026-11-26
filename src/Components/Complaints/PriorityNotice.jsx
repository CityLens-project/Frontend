import { Link } from 'react-router-dom'
import { TriangleAlert } from 'lucide-react'

export default function PriorityNotice({ count }) {
  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-3 rounded-xl bg-warning/10 p-[18px]"
    >
      <TriangleAlert size={20} className="shrink-0 text-warning" aria-hidden="true" />
      <p className="min-w-0 flex-1 text-[13px] leading-[1.45] text-slate-500">
        {count} high-priority road issues need attention. Review safety risks before routine
        maintenance reports.
      </p>
      <Link
        to="/dashboard/road-conditions"
        className="whitespace-nowrap text-[13px] font-semibold text-amber-700 hover:underline"
      >
        View road conditions →
      </Link>
    </div>
  )
}