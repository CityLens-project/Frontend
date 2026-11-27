export const RoadCondition = {
  good: {
    label: 'Good',
    tone: 'success',
    weight: 1,
  },
  maintenance: {
    label: 'Maintenance',
    tone: 'warning',
    weight: 2,
  },
  damaged: {
    label: 'Damaged',
    tone: 'danger',
    weight: 3,
  },
}

export const RoadPriority = {
  high: {
    label: 'High',
    tone: 'danger',
    weight: 3,
  },
  medium: {
    label: 'Medium',
    tone: 'warning',
    weight: 2,
  },
  low: {
    label: 'Low',
    tone: 'neutral',
    weight: 1,
  },
}

export const ROAD_CONDITION_OPTIONS = [
  { value: 'all', label: 'All conditions' },
  { value: 'good', label: 'Good' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'damaged', label: 'Damaged' },
]

export const ROAD_PRIORITY_OPTIONS = [
  { value: 'all', label: 'All priorities' },
  { value: 'high', label: 'High priority' },
  { value: 'medium', label: 'Medium priority' },
  { value: 'low', label: 'Low priority' },
]