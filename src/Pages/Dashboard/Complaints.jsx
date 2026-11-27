
import { useState } from 'react'
import { CircleCheck, Clock, Download, MessageSquare, Search } from 'lucide-react'

import PageHeading from '../../Components/Dashboard/PageHeading'
import StatCard from '../../Components/Dashboard/StatCard'
import Button from '../../Components/Dashboard/Button'
import ComplaintTabs from '../../Components/Complaints/ComplaintTabs'
import ComplaintFilters from '../../Components/Complaints/ComplaintFilters'
import ComplaintsTable from '../../Components/Complaints/ComplaintsTable'
import Pagination from '../../Components/Complaints/Pagination'
import PriorityNotice from '../../Components/Complaints/PriorityNotice'

import {
  DISTRICTS,
  PAGE_SIZE,
  getComplaints,
  getComplaintsSummary,
} from '../../Data/complaints'

import { ComplaintStatus } from '../../Constants/complaintStatus'
import { toISODate } from '../../Utils/date'
import { downloadCsv } from '../../Utils/csv'

const initialFilters = {
  status: 'all',
  search: '',
  district: 'all',
  range: 'all',
  from: '',
  to: '',
}

function resolveDateRange({ range, from, to }) {
  if (range === 'custom') return { dateFrom: from, dateTo: to }
  if (range === 'all') return { dateFrom: '', dateTo: '' }

  const start = new Date()
  start.setDate(start.getDate() - (range === '7d' ? 6 : 29))

  return {
    dateFrom: toISODate(start),
    dateTo: toISODate(new Date()),
  }
}

export default function Complaints() {
  const [filters, setFilters] = useState(initialFilters)
  const [page, setPage] = useState(1)

  const updateFilters = (patch) => {
    setFilters((current) => ({ ...current, ...patch }))
    setPage(1)
  }

  const { dateFrom, dateTo } = resolveDateRange(filters)

  const query = {
    status: filters.status,
    search: filters.search,
    district: filters.district,
    dateFrom,
    dateTo,
  }

  const { items, total, counts } = getComplaints({ ...query, page })
  const summary = getComplaintsSummary()

  const stats = [
    {
      label: 'Open complaints',
      value: summary.counts.under_review + summary.counts.assigned + summary.counts.in_progress,
      context: 'Across all city departments',
      icon: MessageSquare,
      iconClassName: 'text-primary',
    },
    {
      label: 'Under review',
      value: summary.counts.under_review,
      context: 'New reports to verify',
      icon: Search,
      iconClassName: 'text-warning',
    },
    {
      label: 'In progress',
      value: summary.counts.in_progress,
      context: 'Repair or inspection underway',
      icon: Clock,
      iconClassName: 'text-primary',
    },
    {
      label: 'Total Resolved',
      value: summary.counts.resolved,
      context: 'Thanks to your city teams',
      icon: CircleCheck,
      iconClassName: 'text-success',
    },
  ]

  const handleExport = () => {
    const { items: all } = getComplaints({
      ...query,
      page: 1,
      pageSize: Number.MAX_SAFE_INTEGER,
    })

    downloadCsv(
      `complaints-${toISODate(new Date())}.csv`,
      [
        'Reference',
        'Complaint',
        'Category',
        'Priority',
        'Status',
        'District',
        'Road',
        'Submitted',
        'Assigned department',
        'Reported by',
      ],
      all.map((c) => [
        c.reference,
        c.title,
        c.category,
        c.priority,
        ComplaintStatus[c.status].label,
        c.location.district,
        c.location.road,
        c.submittedAt,
        c.assignedDepartment ?? '',
        c.reportedBy.name,
      ]),
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <PageHeading
          title="Citizen complaints"
          description="Listen to your community. Review reports and coordinate the next step."
        />

        <Button icon={Download} onClick={handleExport}>
          Export complaints
        </Button>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="flex flex-col gap-[18px] rounded-2xl border border-slate-200 bg-white p-card shadow-sm">
        <ComplaintTabs
          active={filters.status}
          counts={counts}
          onChange={(status) => updateFilters({ status })}
        />

        <ComplaintFilters
          filters={filters}
          districts={DISTRICTS}
          onChange={updateFilters}
        />

        <ComplaintsTable complaints={items} />

        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          onPageChange={setPage}
          itemLabel="complaints"
        />
      </section>

      <PriorityNotice count={summary.highPriorityRoadIssues} />
    </div>
  )
}
