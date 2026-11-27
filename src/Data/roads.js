import { RoadCondition, RoadPriority } from '../Constants/roadCondition'

export const ROAD_PAGE_SIZE = 5

export const DISTRICTS = [
  'Central',
  'North',
  'South',
  'Industrial Zone',
]

const ROAD_NAMES = [
  'Gamal Abdel Nasser Street',
  'Saad Ibn Abi Waqqas Street',
  'El Geish Street',
  'El Nasr Street',
  'El Tahrir Street',
  'Industrial Zone Road',
  'Central Service Road',
  'North Entrance Road',
  'South Entrance Road',
  'Main Commercial Road',
  'University Road',
  'Residential District Road',
  'Ring Road',
  'El Salam Street',
  'Al Mostakbal Road',
  'Public Services Road',
  'Eastern Connector Road',
  'Western Connector Road',
]

const ISSUE_TYPES = [
  'Potholes',
  'Potholes',
  'Potholes',
  'Potholes',
  'Potholes',
  'Potholes',
  'Surface damage',
  'Surface damage',
  'Surface damage',
  'Road markings',
  'Road markings',
  'Drain covers',
]

function createRoads() {
  return Array.from({ length: 126 }, (_, index) => {
    const isDamaged = index < 12
    const isMaintenance = index >= 12 && index < 18

    const condition = isDamaged
      ? 'damaged'
      : isMaintenance
        ? 'maintenance'
        : 'good'

    const priority = isDamaged
      ? index < 5
        ? 'high'
        : index < 9
          ? 'medium'
          : 'low'
      : isMaintenance
        ? index < 14
          ? 'medium'
          : 'low'
        : 'low'

    const nameIndex = index % ROAD_NAMES.length
    const section = Math.floor(index / ROAD_NAMES.length) + 1

    return {
      id: `road-${index + 1}`,
      reference: `CL-${String(index + 1).padStart(3, '0')}`,
      name:
        section === 1
          ? ROAD_NAMES[nameIndex]
          : `${ROAD_NAMES[nameIndex]} - Section ${section}`,
      district: DISTRICTS[index % DISTRICTS.length],
      condition,
      priority,
      issueType: isDamaged ? ISSUE_TYPES[index] : null,
    }
  })
}

export const roads = createRoads()

export function getRoadsSummary() {
  const counts = roads.reduce(
    (result, road) => {
      result[road.condition] += 1

      if (road.priority === 'high') {
        result.highPriority += 1
      }

      return result
    },
    {
      good: 0,
      maintenance: 0,
      damaged: 0,
      highPriority: 0,
    },
  )

  return {
    total: roads.length,
    counts,
    healthyPercentage: Math.round((counts.good / roads.length) * 100),
  }
}

export function getIssueTypesSummary() {
  const totalIssues = roads.filter((road) => road.issueType).length

  const issueCounts = [
    'Potholes',
    'Surface damage',
    'Road markings',
    'Drain covers',
  ].map((label) => {
    const count = roads.filter((road) => road.issueType === label).length

    return {
      label,
      count,
      percentage: totalIssues
        ? Math.round((count / totalIssues) * 100)
        : 0,
    }
  })

  return {
    total: totalIssues,
    items: issueCounts,
  }
}

export function getRoads({
  search = '',
  condition = 'all',
  priority = 'all',
  page = 1,
  pageSize = ROAD_PAGE_SIZE,
} = {}) {
  const normalizedSearch = search.trim().toLowerCase()

  const filteredRoads = roads
    .filter((road) => {
      const matchesSearch =
        !normalizedSearch ||
        road.reference.toLowerCase().includes(normalizedSearch) ||
        road.name.toLowerCase().includes(normalizedSearch) ||
        road.district.toLowerCase().includes(normalizedSearch)

      const matchesCondition =
        condition === 'all' || road.condition === condition

      const matchesPriority =
        priority === 'all' || road.priority === priority

      return matchesSearch && matchesCondition && matchesPriority
    })
    .sort((a, b) => {
      const priorityDifference =
        RoadPriority[b.priority].weight - RoadPriority[a.priority].weight

      if (priorityDifference !== 0) return priorityDifference

      const conditionDifference =
        (RoadCondition[b.condition]?.weight ?? 0) -
        (RoadCondition[a.condition]?.weight ?? 0)

      if (conditionDifference !== 0) return conditionDifference

      return a.reference.localeCompare(b.reference)
    })

  const total = filteredRoads.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const startIndex = (safePage - 1) * pageSize

  return {
    items: filteredRoads.slice(startIndex, startIndex + pageSize),
    total,
    page: safePage,
    totalPages,
  }
}