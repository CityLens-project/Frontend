export const overviewData = {
  stats: [
    { id: 'avgSpeed', label: 'Average traffic speed', value: 34, unit: 'km/h', context: '↑ 4 km/h compared with yesterday' },
    { id: 'roadsNeedingAttention', label: 'Roads needing attention', value: 12, context: '5 high-priority road issues' },
    { id: 'openComplaints', label: 'Open complaints', value: 24, context: '8 reports are awaiting review' },
    { id: 'reportsResolved', label: 'Reports resolved', value: 68, context: 'This month · 12 more than last month' },
  ],

  trafficSeries: [
    { hour: '00:00', today: 4, yesterday: 5 },
    { hour: '01:00', today: 28, yesterday: 30 },
    { hour: '02:00', today: 42, yesterday: 40 },
    { hour: '03:00', today: 52, yesterday: 55 },
    { hour: '04:00', today: 72, yesterday: 80 },
    { hour: '05:00', today: 88, yesterday: 98 },
    { hour: '06:00', today: 75, yesterday: 80 },
    { hour: '07:00', today: 50, yesterday: 48 },
    { hour: '08:00', today: 28, yesterday: 24 },
    { hour: '09:00', today: 22, yesterday: 20 },
    { hour: '10:00', today: 24, yesterday: 22 },
    { hour: '11:00', today: 27, yesterday: 28 },
    { hour: '12:00', today: 30, yesterday: 32 },
    { hour: '13:00', today: 48, yesterday: 50 },
    { hour: '14:00', today: 70, yesterday: 72 },
    { hour: '15:00', today: 92, yesterday: 95 },
    { hour: '16:00', today: 100, yesterday: 98 },
    { hour: '17:00', today: 98, yesterday: 96 },
    { hour: '18:00', today: 90, yesterday: 92 },
    { hour: '19:00', today: 80, yesterday: 88 },
    { hour: '20:00', today: 78, yesterday: 84 },
    { hour: '21:00', today: 76, yesterday: 80 },
    { hour: '22:00', today: 66, yesterday: 70 },
    { hour: '23:00', today: 68, yesterday: 65 },
  ],

  roadHealth: { activeIssues: 12, highPriority: 5 },

  recentComplaints: {
    total: 24,
    items: [
      { id: 1042, reference: 'CL-1042', title: 'Pothole on Gamal Abdel Nasser Street', location: 'Gamal Abdel Nasser St · Central', submittedAt: '2026-11-18', status: 'in_progress' },
      { id: 1038, reference: 'CL-1038', title: 'Traffic signal not working', location: 'Saad Ibn Abi Waqqas St · Central', submittedAt: '2026-11-17', status: 'under_review' },
      { id: 1021, reference: 'CL-1021', title: 'Faded pedestrian crossing', location: 'Taha Hussein St · North', submittedAt: '2026-11-12', status: 'resolved' },
    ],
  },
}