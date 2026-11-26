import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Badge from '../Dashboard/Badge'

const xTicks = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:00']
const yTicks = [0, 25, 50, 75, 100]
const axisTick = { fontSize: 11, fill: '#64748b' }

export default function TrafficChart({ data }) {
  return (
    <section className="flex min-w-0 flex-col gap-[18px] rounded-2xl border border-slate-200 bg-white p-card shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Traffic through the day</h2>
      <p className="text-[13px] leading-[1.45] text-slate-500">
        Citywide congestion index · Lower is better
      </p>

      <div
        role="img"
        aria-label="Chart of the citywide congestion index through the day, today compared with yesterday"
      >
        <ResponsiveContainer width="100%" height={210}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="hour"
              ticks={xTicks}
              interval={0}
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={[0, 100]}
              ticks={yTicks}
              width={32}
              tick={axisTick}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                fontSize: 12,
                boxShadow: 'none',
              }}
            />
            <Area
              type="monotone"
              dataKey="today"
              name="Today"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              fill="var(--color-primary)"
              fillOpacity={0.1}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="yesterday"
              name="Yesterday"
              stroke="var(--color-success)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-6 pt-2">
        <Badge tone="primary">Today</Badge>
        <Badge tone="success">Yesterday</Badge>
      </div>
    </section>
  )
}