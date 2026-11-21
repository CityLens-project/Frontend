import { Link } from 'react-router-dom'
import Badge from '../Dashboard/Badge'
import { ComplaintStatus } from '../../Constants/complaintStatus'

const headers = ['Reference', 'Complaint', 'Location', 'Submitted', 'Status']

const formatDate = (iso) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))

export default function RecentComplaints({ complaints, total }) {
  return (
    <section className="flex min-w-0 flex-col gap-[18px] rounded-2xl border border-slate-200 bg-white p-card shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Recent citizen complaints</h2>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] leading-[1.45] text-slate-500">
          Listen, verify and send issues to the right team.
        </p>
        <Link
          to="/dashboard/complaints"
          className="text-[13px] font-semibold text-primary hover:underline"
        >
          View all {total} complaints →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              {headers.map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => {
              const status = ComplaintStatus[c.status]
              return (
                <tr key={c.id} className="h-[68px]">
                  <td className="px-4 text-xs font-medium text-primary">{c.reference}</td>
                  <td className="px-4 text-[13px] font-medium text-slate-800">{c.title}</td>
                  <td className="px-4 text-xs text-slate-500">{c.location}</td>
                  <td className="px-4 text-xs text-slate-500">{formatDate(c.submittedAt)}</td>
                  <td className="px-4">
                    <Badge tone={status.tone}>{status.label}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}