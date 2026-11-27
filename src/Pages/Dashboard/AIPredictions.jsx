
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import PageHeading from '../../Components/Dashboard/PageHeading'
import ForecastStats from '../../Components/AiPredictions/ForecastStats'
import CongestionChart from '../../Components/AiPredictions/CongestionChart'
import NextStepCard from '../../Components/AiPredictions/NextStepCard'
import CongestionComparison from '../../Components/AiPredictions/CongestionComparison'
import PredictionCoverage from '../../Components/AiPredictions/PredictionCoverage'
import PredictedHotspots from '../../Components/AiPredictions/PredictedHotspots'
import ForecastNotice from '../../Components/AiPredictions/ForecastNotice'

import {
  FORECAST_WINDOWS,
  ROADS,
  getAiPredictions,
} from '../../Data/aiPredictions'

export default function AiPredictions() {
  const [forecastWindow, setForecastWindow] = useState('6')
  const [selectedRoad, setSelectedRoad] = useState('All roads')

  const predictions = getAiPredictions(forecastWindow, selectedRoad)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <PageHeading
          title="AI predictions"
          description="Look ahead, plan early and make informed decisions for Sadat City."
        />

        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex h-11 min-w-[190px] items-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm">
            <select
              value={selectedRoad}
              onChange={(e) => setSelectedRoad(e.target.value)}
              aria-label="Select road"
              className="h-full w-full cursor-pointer appearance-none bg-transparent pl-4 pr-10 outline-none"
            >
              {ROADS.map((road) => (
                <option key={road} value={road}>
                  {road}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 text-slate-500"
            />
          </label>
          <label className="relative flex h-11 min-w-[160px] items-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm">
            <select
              value={forecastWindow}
              onChange={(e) => setForecastWindow(e.target.value)}
              aria-label="Forecast time window"
              className="h-full w-full cursor-pointer appearance-none bg-transparent pl-4 pr-10 outline-none"
            >
              {FORECAST_WINDOWS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 text-slate-500"
            />
          </label>
        </div>
      </div>
      <ForecastStats stats={predictions.stats} />

      <section className="grid min-w-0 gap-5 xl:grid-cols-[1.8fr_0.9fr]">
        <CongestionChart
          data={predictions.chart}
          forecastWindow={forecastWindow}
        />

        <NextStepCard data={predictions.nextStep} />
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-[1.8fr_0.9fr]">
        <CongestionComparison data={predictions.comparison} />

        <PredictionCoverage data={predictions.coverage} />
      </section>
      <PredictedHotspots hotspots={predictions.hotspots} />
      <ForecastNotice />
    </div>
  )
}
