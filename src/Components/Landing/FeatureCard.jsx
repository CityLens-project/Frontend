export default function FeatureCard({ icon: Icon, title, text }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-card shadow-sm">
      <div className="grid size-12 place-items-center rounded-xl bg-primary/10">
        <Icon size={24} className="text-primary" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{text}</p>
    </article>
  )
}