
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Activity } from 'lucide-react'

export default function CongestionChart({ data, forecastWindow }) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Predicted congestion
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Citywide index · Next {forecastWindow} hours
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600">
          <Activity size={12} />
          AI forecast
        </span>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#E9EEF5"
              strokeDasharray="0"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tick={{ fill: '#64748B', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fill: '#64748B', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                fontSize: '12px',
              }}
            />

            <Area
              type="monotone"
              dataKey="historical"
              name="Typical conditions"
              stroke="#10B981"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="transparent"
              dot={false}
            />

            <Area
              type="monotone"
              dataKey="predicted"
              name="AI forecast"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#predictedGradient)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-medium text-blue-600">
          <span className="h-0.5 w-3 rounded bg-blue-500" />
          Predicted congestion · AI forecast
        </span>

        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-medium text-emerald-700">
          <span className="h-0.5 w-3 rounded border-t-2 border-dashed border-emerald-500" />
          Typical conditions · historical
        </span>
      </div>
    </section>
  )
}
