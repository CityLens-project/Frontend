function LegendItem({ children, marker }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-700">
      {marker}
      <span>{children}</span>
    </div>
  )
}

export default function MapLegend() {
  return (
    <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 xl:grid-cols-3">
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Traffic (Road colour)
        </h3>

        <LegendItem marker={<span className="h-1.5 w-5 rounded-full bg-emerald-500" />}>
          Clear
        </LegendItem>

        <LegendItem marker={<span className="h-1.5 w-5 rounded-full bg-amber-500" />}>
          Moderate
        </LegendItem>

        <LegendItem marker={<span className="h-1.5 w-5 rounded-full bg-red-500" />}>
          Heavy
        </LegendItem>
      </div>

      <div className="space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Road damage severity
        </h3>

        <LegendItem marker={<span className="h-2.5 w-2.5 rounded-full bg-red-500" />}>
          High · Pothole, surface damage
        </LegendItem>

        <LegendItem marker={<span className="h-2.5 w-2.5 rounded-full bg-amber-500" />}>
          Medium · Signal, markings
        </LegendItem>

        <LegendItem marker={<span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />}>
          Low · Minor, scheduled
        </LegendItem>
      </div>

      <div className="space-y-3">
        <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
          Other markers
        </h3>

        <LegendItem
          marker={
            <span className="h-3 w-3 rounded-[3px] bg-blue-600" />
          }
        >
          Approved citizen complaint
        </LegendItem>

        <LegendItem
          marker={
            <span className="h-3 w-3 rounded-full border border-dashed border-amber-600 bg-amber-100" />
          }
        >
          AI-predicted congestion area
        </LegendItem>

        <LegendItem
          marker={
            <span className="h-2 w-5 rounded-full bg-blue-200" />
          }
        >
          Selected road
        </LegendItem>
      </div>
    </div>
  )
}
