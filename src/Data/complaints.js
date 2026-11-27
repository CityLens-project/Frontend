import { toISODate } from '../Utils/date'

export const PAGE_SIZE = 6
export const DISTRICTS = ['Central', 'North', 'South', 'Industrial Zone']

const ROADS = {
  Central: ['Gamal Abdel Nasser St', 'Saad Ibn Abi Waqqas St', 'Amr Ibn Al-As St'],
  North: ['Taha Hussein St', 'University Rd'],
  South: ['Abdel Moneim Riad St', 'South Ring Rd'],
  'Industrial Zone': ['Industrial Zone Main Rd', 'Logistics Ave'],
}

const TEMPLATES = [
  { title: 'Pothole on {road}', category: 'Road surface', priority: 'high', department: 'Roads & Maintenance', description: 'Large pothole in the right lane of {road} ({district}), damaging passing vehicles.' },
  { title: 'Traffic signal not working', category: 'Traffic signals', priority: 'high', department: 'Traffic Control', description: 'The signal at the {road} junction ({district}) is off, causing heavy congestion at peak hours.' },
  { title: 'Faded pedestrian crossing', category: 'Road markings', priority: 'medium', department: 'Roads & Maintenance', description: 'Crossing markings near {road} ({district}) are barely visible, especially at night.' },
  { title: 'Loose drain cover', category: 'Drainage', priority: 'high', department: 'Drainage & Utilities', description: 'A drain cover on {road} ({district}) is loose and moves when vehicles pass.' },
  { title: 'Street light out on {road}', category: 'Street lighting', priority: 'medium', department: 'Lighting & Electricity', description: 'Several street lights on {road} ({district}) have been off for days.' },
  { title: 'Surface damage on {road}', category: 'Road surface', priority: 'medium', department: 'Roads & Maintenance', description: 'The asphalt on {road} ({district}) is breaking up along the edge of the lane.' },
  { title: 'Pedestrian signal fault', category: 'Traffic signals', priority: 'high', department: 'Traffic Control', description: 'The pedestrian signal on {road} ({district}) does not change, so people cross unprotected.' },
  { title: 'Missing road sign', category: 'Signage', priority: 'low', department: 'Traffic Control', description: 'A direction sign on {road} ({district}) is missing after recent works.' },
  { title: 'Water pooling after rain', category: 'Drainage', priority: 'medium', department: 'Drainage & Utilities', description: 'Water collects on {road} ({district}) after light rain and blocks one lane.' },
  { title: 'Cracked pavement', category: 'Road surface', priority: 'low', department: 'Roads & Maintenance', description: 'The pavement beside {road} ({district}) is cracked and uneven for pedestrians.' },
  { title: 'Vehicles blocking the lane', category: 'Traffic flow', priority: 'low', department: 'Traffic Control', description: 'Parked vehicles regularly block a lane on {road} ({district}).' },
  { title: 'Damaged speed bump', category: 'Road surface', priority: 'medium', department: 'Roads & Maintenance', description: 'The speed bump on {road} ({district}) is broken and unsafe for motorbikes.' },
]
const TEMPLATE_ORDER = [5, 6, 0, 1, 2, 3, 4, 7, 8, 9, 10, 11]

const REPORTERS = ['Ahmed Hassan', 'Mona Ibrahim', 'Omar Khaled', 'Sara Nabil', 'Youssef Adel', 'Nour Mahmoud', 'Karim Fathy', 'Hana Samir']
const STATUS_PATTERN = ['UAIURRIUAI', 'RUIRAIRUIR', 'AIRURAIRUI', 'RARUIRRRRR'].join('')
const STATUS_BY_CODE = { U: 'under_review', A: 'assigned', I: 'in_progress', R: 'resolved' }

const TOTAL = 92
const FIRST_ID = 1097

const fill = (text, road, district) =>
  text.replace('{road}', road).replace('{district}', district)

const addDays = (iso, days) => {
  const [y, m, d] = iso.split('-').map(Number)
  return toISODate(new Date(y, m - 1, d + days))
}
const today = toISODate(new Date())

function buildTimeline(status, submittedAt, department) {
  const events = [
    { at: `${submittedAt}T09:00:00`, label: 'Complaint submitted', actor: 'Citizen' },
  ]
  if (status !== 'under_review') {
    events.push({ at: `${addDays(submittedAt, 1)}T11:30:00`, label: `Assigned to ${department}`, actor: 'City administrator' })
  }
  if (status === 'in_progress' || status === 'resolved') {
    events.push({ at: `${addDays(submittedAt, 2)}T10:00:00`, label: 'Work started', actor: department })
  }
  if (status === 'resolved') {
    events.push({ at: `${addDays(submittedAt, 3)}T15:00:00`, label: 'Marked as resolved', actor: department })
  }
  return events
}

const allComplaints = Array.from({ length: TOTAL }, (_, i) => {
  const template = TEMPLATES[TEMPLATE_ORDER[i % TEMPLATE_ORDER.length]]
  const district = DISTRICTS[(i * 3) % DISTRICTS.length]
  const roads = ROADS[district]
  const road = roads[i % roads.length]
  const status = STATUS_BY_CODE[STATUS_PATTERN[i] ?? 'R']
  const submittedAt = addDays(today, -(1 + Math.floor(i * 1.2)))
  const department = status === 'under_review' ? null : template.department
  const reporter = REPORTERS[(i * 7) % REPORTERS.length]
  const reference = `CL-${FIRST_ID - i}`

  return {
    id: FIRST_ID - i,
    reference,
    title: fill(template.title, road, district),
    description: fill(template.description, road, district),
    category: template.category,
    priority: template.priority,
    status,
    submittedAt,
    location: {
      road,
      district,
      lat: +(30.37 + (i % 9) * 0.004).toFixed(4),
      lng: +(30.53 + (i % 7) * 0.005).toFixed(4),
    },
    assignedDepartment: department,
    reportedBy: {
      name: reporter,
      email: `${reporter.toLowerCase().replace(' ', '.')}@example.com`,
    },
    attachments:
      i % 3 === 0
        ? []
        : [{ id: `${reference}-1`, name: 'photo-1.jpg', type: 'image', url: null }],
    activityTimeline: buildTimeline(status, submittedAt, department),
    plannedInspection:
      status === 'assigned' || status === 'in_progress'
        ? { date: addDays(submittedAt, 4), team: department }
        : null,
  }
})

const countByStatus = (list) =>
  list.reduce(
    (acc, c) => {
      acc[c.status] += 1
      return acc
    },
    { all: list.length, under_review: 0, assigned: 0, in_progress: 0, resolved: 0 },
  )
export function getComplaints({
  status = 'all',
  search = '',
  district = 'all',
  dateFrom = '',
  dateTo = '',
  page = 1,
  pageSize = PAGE_SIZE,
} = {}) {
  const query = search.trim().toLowerCase()

  const base = allComplaints.filter(
    (c) =>
      (district === 'all' || c.location.district === district) &&
      (!dateFrom || c.submittedAt >= dateFrom) &&
      (!dateTo || c.submittedAt <= dateTo) &&
      (!query ||
        c.reference.toLowerCase().includes(query) ||
        c.title.toLowerCase().includes(query) ||
        c.location.road.toLowerCase().includes(query)),
  )

  const matched = status === 'all' ? base : base.filter((c) => c.status === status)
  const start = (page - 1) * pageSize

  return {
    items: matched.slice(start, start + pageSize),
    total: matched.length,
    counts: countByStatus(base),
  }
}

export function getComplaintsSummary() {
  return {
    counts: countByStatus(allComplaints),
    highPriorityRoadIssues: 5,
  }
}