const tones = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
  warning: 'bg-warning/10 text-amber-700',
  resolved: 'bg-green-50 text-green-700',
  assigned: 'bg-secondary/10 text-secondary',
}

export default function Badge({ tone = 'primary', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1.5 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}