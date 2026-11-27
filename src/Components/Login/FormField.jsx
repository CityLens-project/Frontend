import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function FormField({ label, type = 'text', icon: Icon, ...props }) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
      </label>

      <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-[13px] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <input
          id={id}
          type={isPassword && visible ? 'text' : type}
          className="flex-1 bg-transparent py-3 text-sm leading-5 text-slate-800 outline-none placeholder:text-slate-500"
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="text-slate-500 transition-colors hover:text-slate-700"
          >
            {visible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        ) : (
          Icon && <Icon size={18} className="text-slate-500" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}