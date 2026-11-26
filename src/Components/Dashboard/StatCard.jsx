export default function StatCard({ label, value, unit, context, icon: Icon, iconClassName }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-card shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] text-slate-500">{label}</h3>
        <Icon size={20} className={iconClassName} aria-hidden="true" />
      </div>
      <p className="text-3xl font-bold text-secondary">
        {value}
        {unit && `${unit}`}
      </p>
      <p className="text-xs leading-[1.45] text-slate-500">{context}</p>
    </article>
  )
}