const variants = {
  primary: 'border-transparent bg-primary text-white hover:bg-primary/90',
  secondary: 'border-slate-200 bg-white text-secondary hover:bg-slate-50',
}

export default function Button({
  variant = 'secondary',
  icon: Icon,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-[18px] text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:border-transparent disabled:bg-slate-200 disabled:text-slate-500 disabled:hover:bg-slate-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} aria-hidden="true" />}
      {children}
    </button>
  )
}