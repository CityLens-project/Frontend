
export const FORECAST_WINDOWS = [
  { value: '6', label: 'Next 6 hours' },
  { value: '12', label: 'Next 12 hours' },
  { value: '24', label: 'Next 24 hours' },
]

export const ROADS = [
  'All roads',
  'Gamal Abdel Nasser St',
  'Taha Hussein St',
  'Saad Ibn Abi Waqqas St',
  'Amr Ibn Al-Aas St',
  'Abdel Moneim Riad St',
]

// Mock scenarios: values are illustrative, not real AI predictions.
const roadScenarios = {
  'Gamal Abdel Nasser St': {
    current: 'Moderate',
    confidence: 87,
    levels: {
      6: ['Moderate', 'High', 'High', 'Moderate', 'Moderate', 'Low'],
      12: ['Moderate', 'High', 'High', 'High', 'Moderate', 'Moderate'],
      24: ['Moderate', 'High', 'High', 'Moderate', 'Low', 'Moderate'],
    },
  },
  'Taha Hussein St': {
    current: 'High',
    confidence: 82,
    levels: {
      6: ['High', 'Moderate', 'Moderate', 'Low', 'Low', 'Moderate'],
      12: ['High', 'Moderate', 'Low', 'Low', 'Moderate', 'High'],
      24: ['High', 'Moderate', 'Low', 'Moderate', 'High', 'Moderate'],
    },
  },
  'Saad Ibn Abi Waqqas St': {
    current: 'Low',
    confidence: 78,
    levels: {
      6: ['Low', 'Moderate', 'Moderate', 'Moderate', 'Low', 'Low'],
      12: ['Low', 'Moderate', 'High', 'Moderate', 'Low', 'Moderate'],
      24: ['Low', 'Moderate', 'High', 'Moderate', 'Moderate', 'Low'],
    },
  },
  'Amr Ibn Al-Aas St': {
    current: 'Low',
    confidence: 91,
    levels: {
      6: ['Low', 'Low', 'Low', 'Low', 'Moderate', 'Low'],
      12: ['Low', 'Low', 'Moderate', 'Low', 'Moderate', 'Low'],
      24: ['Low', 'Moderate', 'Moderate', 'Low', 'Low', 'Moderate'],
    },
  },
  'Abdel Moneim Riad St': {
    current: 'Moderate',
    confidence: 85,
    levels: {
      6: ['Moderate', 'Moderate', 'High', 'Moderate', 'Low', 'Low'],
      12: ['Moderate', 'High', 'High', 'Moderate', 'Moderate', 'Low'],
      24: ['Moderate', 'High', 'Moderate', 'Low', 'Moderate', 'High'],
    },
  },
}

const levelValues = {
  Low: 25,
  Moderate: 55,
  High: 90,
}

const levelTimes = {
  6: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
  12: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
  24: ['10:00', '14:00', '18:00', '22:00', '02:00', '06:00'],
}

const getRoadPrediction = (road, window) => {
  const scenario = roadScenarios[road]
  const levels = scenario.levels[window]

  return {
    name: road,
    current: scenario.current,
    predicted: levels.reduce((highest, level) =>
      levelValues[level] > levelValues[highest] ? level : highest
    , levels[0]),
    confidence: scenario.confidence,
    levels,
  }
}

export const getAiPredictions = (window = '6', selectedRoad = 'All roads') => {
  const roads = Object.keys(roadScenarios).map((road) =>
    getRoadPrediction(road, window)
  )

  const visibleRoads =
    selectedRoad === 'All roads'
      ? roads
      : roads.filter((road) => road.name === selectedRoad)

  const chartRoads =
    selectedRoad === 'All roads'
      ? roads
      : visibleRoads

  const chart = levelTimes[window].map((time, index) => {
    const values = chartRoads.map((road) =>
      levelValues[road.levels[index]]
    )

    const predicted = Math.round(
      values.reduce((sum, value) => sum + value, 0) / values.length
    )

    return {
      time,
      predicted,
      historical: Math.max(10, predicted - 8),
    }
  })

  const highestRiskRoad = [...visibleRoads].sort(
    (a, b) => levelValues[b.predicted] - levelValues[a.predicted]
  )[0]

  const nextStep = {
    road: highestRiskRoad.name,
    level: highestRiskRoad.predicted,
    expectedTime: `${levelTimes[window][0]} – ${levelTimes[window][1]}`,
    confidence: `${highestRiskRoad.confidence}%`,
    description: `Traffic is expected to reach ${highestRiskRoad.predicted.toLowerCase()} levels on ${highestRiskRoad.name} during this forecast period. Consider monitoring this road and reviewing alternative routes.`,
    alternativeRoad:
      roads.find((road) => road.name !== highestRiskRoad.name)?.name ?? 'No alternative',
    currentSpeed: '42 km/h',
    originalDuration: 24,
    alternativeDuration: 18,
    savedTime: 6,
  }

  const hotspots = visibleRoads.map((road, index) => {
    const peakIndex = road.levels.indexOf(road.predicted)

    return {
      id: index + 1,
      road: road.name,
      time: levelTimes[window][peakIndex],
      traffic: road.predicted,
      confidence: road.confidence,
      action:
        road.predicted === 'High'
          ? 'Consider alternative routes'
          : road.predicted === 'Moderate'
            ? 'Monitor traffic conditions'
            : 'No action needed',
    }
  })

  const highRiskCount = visibleRoads.filter(
    (road) => road.predicted === 'High'
  ).length

  const averageConfidence = Math.round(
    visibleRoads.reduce((sum, road) => sum + road.confidence, 0) /
      visibleRoads.length
  )

  const predictedValue = Math.round(
    visibleRoads.reduce(
      (sum, road) => sum + levelValues[road.predicted],
      0
    ) / visibleRoads.length
  )

  return {
    stats: [
      {
        label: 'Forecast confidence',
        value: `${averageConfidence}%`,
        context: selectedRoad === 'All roads' ? 'Across selected roads' : selectedRoad,
        type: 'confidence',
      },
      {
        label: 'Congestion hotspots',
        value: String(highRiskCount),
        context: `Likely in the next ${window} hours`,
        type: 'hotspots',
      },
      {
        label: 'Suggested route saving',
        value: '6 min',
        context: 'Estimated time saving',
        type: 'saving',
      },
      {
        label: 'Forecast refreshed',
        value: '09:30',
        context: 'Updates every 30 minutes',
        type: 'refresh',
      },
    ],

    chart,

    nextStep,

    comparison: {
      current: {
        value: 38,
        level: selectedRoad === 'All roads'
          ? 'Moderate'
          : visibleRoads[0].current,
      },
      predicted: {
        value: predictedValue,
        time: `Within the next ${window} hours`,
      },
      roads: visibleRoads.map((road) => ({
        name: road.name,
        current: road.current,
        predicted: road.predicted,
        change:
          levelValues[road.predicted] > levelValues[road.current]
            ? 'Getting busier'
            : levelValues[road.predicted] < levelValues[road.current]
              ? 'Easing'
              : 'No change',
        direction:
          levelValues[road.predicted] > levelValues[road.current]
            ? 'up'
            : levelValues[road.predicted] < levelValues[road.current]
              ? 'down'
              : 'neutral',
      })),
    },

    coverage: {
      area: 'Sadat City',
      forecastWindow: `Next ${window} hours`,
      refresh: 'Every 30 minutes · Last 09:30',
      roads: visibleRoads.map((road) => road.name),
    },

    hotspots,
  }
}
