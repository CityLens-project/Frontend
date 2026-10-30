import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import FormField from './FormField'
export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/overview')
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-8 sm:px-6 md:px-8 xl:px-[100px] xl:py-12">
      <Link
        to="/"
        className="flex w-full max-w-[640px] items-center gap-2 text-[13px] text-slate-500 transition-colors hover:text-secondary"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to CityLens
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[440px] flex-col gap-[22px] md:pt-12 xl:pt-[120px]"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold text-secondary">Welcome.</h1>
          <p className="text-[15px] text-slate-500">
            Log in to access your city management dashboard.
          </p>
        </div>

        <FormField
          label="Authority email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mail@gmail.com"
          icon={Mail}
          autoComplete="username"
          required
        />

        <FormField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[13px] text-slate-800">
            <input type="checkbox" className="size-4 accent-primary" />
            Remember me
          </label>
          <button type="button" className="text-[13px] font-medium text-primary hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-[18px] py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          <ArrowRight size={18} aria-hidden="true" />
          Log in
        </button>

        <p className="text-center text-[13px] font-semibold text-primary">
          Authorized city personnel only.
        </p>
      </form>

      <p className="text-center text-xs text-slate-500">
        Your information stays private and secure.
      </p>
    </main>
  )
}