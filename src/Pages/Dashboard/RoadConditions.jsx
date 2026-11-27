import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Route,
  CircleCheck,
  Wrench,
  TriangleAlert,
  Map,
} from 'lucide-react'

import PageHeading from '../../Components/Dashboard/PageHeading'
import StatCard from '../../Components/Dashboard/StatCard'
import Button from '../../Components/Dashboard/Button'
import IssueTypesCard from '../../Components/RoadConditions/IssueTypesCard'
import RoadConditionSummary from '../../Components/RoadConditions/RoadConditionSummary'
import RoadRegister from '../../Components/RoadConditions/RoadRegister'

import {
  getRoads,
  getRoadsSummary,
  getIssueTypesSummary,
  ROAD_PAGE_SIZE,
} from '../../Data/roads'

const initialFilters = {
  search: '',
  condition: 'all',
  priority: 'all',
}

export default function RoadCondition() {
  const navigate = useNavigate()

  const [filters, setFilters] = useState(initialFilters)
  const [page, setPage] = useState(1)

  const summary = getRoadsSummary()
  const issueSummary = getIssueTypesSummary()

  const { items, total } = getRoads({
    ...filters,
    page,
    pageSize: ROAD_PAGE_SIZE,
  })

  const updateFilters = (patch) => {
    setFilters((current) => ({
      ...current,
      ...patch,
    }))

    setPage(1)
  }

  const stats = [
    {
      label: 'Monitored roads',
      value: summary.total,
      context: 'Across 4 city districts',
      icon: Route,
      iconClassName: 'text-primary',
    },
    {
      label: 'Healthy roads',
      value: summary.counts.good,
     context: `${summary.healthyPercentage}% in good condition`,
      icon: CircleCheck,
      iconClassName: 'text-success',
    },
    {
      label: 'Under maintenance',
      value: summary.counts.maintenance,
      context: 'Crews working on improvements',
      icon: Wrench,
      iconClassName: 'text-warning',
    },
    {
      label: 'Damaged roads',
      value: summary.counts.damaged,
      context: ${summary.counts.highPriority} high-priority issues,
      icon: TriangleAlert,
      iconClassName: 'text-danger',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeading
          title="Road conditions"
          description="See where repairs are needed and keep the city moving safely."
        />

        <Button
          icon={Map}
          onClick={() => navigate('/dashboard/smart-map')}
        >
          Open smart map
        </Button>
      </div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RoadConditionSummary />

        <IssueTypesCard
          issues={issueSummary.items}
          total={issueSummary.total}
        />
      </section>

      <RoadRegister
        roads={items}
        total={total}
        filters={filters}
        onFiltersChange={updateFilters}
        page={page}
        pageSize={ROAD_PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  )
}
