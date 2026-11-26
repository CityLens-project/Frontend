import Badge from '../Dashboard/Badge'
import { ComplaintStatus } from '../../Constants/complaintStatus'
import { formatDate } from '../../Utils/date'

const columns = [
  { label: 'Reference', className: 'w-[100px]' },
  { label: 'Complaint', className: '' },
  { label: 'Location', className: 'w-[172px]' },
  { label: 'Submitted', className: 'w-[110px]' },
  { label: 'Status', className: 'w-[134px]' },
]

export default function ComplaintsTable({ complaints }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] table-fixed text-left">
        <thead className="bg-slate-50 text-xs text-slate-500">
          <tr className="h-10">
            {columns.map(({ label, className }) => (
              <th key={label} scope="col" className={`px-3 font-normal ${className}`}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {complaints.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-16 text-center text-sm text-slate-500">
                No complaints match your filters.
              </td>
            </tr>
          ) : (
            complaints.map((c) => {
              const status = ComplaintStatus[c.status]
              return (
                <tr key={c.id} className="h-[76px] transition-colors hover:bg-slate-50">
                  <td className="px-3 text-xs font-medium text-primary">{c.reference}</td>
                  <td className="px-3 text-[13px] font-medium text-slate-800">{c.title}</td>
                  <td className="px-3 text-xs leading-[1.45] text-slate-500">
                    {c.location.road} · {c.location.district}
                  </td>
                  <td className="px-3 text-xs text-slate-500">{formatDate(c.submittedAt)}</td>
                  <td className="px-3">
                    <Badge tone={status.tone}>{status.label}</Badge>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}