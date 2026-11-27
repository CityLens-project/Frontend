export default function PageHeading({ title, description }) {
  return (
    <div className="flex flex-col gap-1.5">
      <h1 className="text-3xl font-bold text-secondary">{title}</h1>
      <p className="text-sm leading-[1.45] text-slate-500">{description}</p>
    </div>
  )
}