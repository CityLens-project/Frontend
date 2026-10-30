import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Banner() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-12 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold leading-snug text-white">
          See your city through a smarter lens.
        </h2>

        <p className="text-[15px] text-white/80">"Manage city issues"</p>

        <Link
          to="/login"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Access Dashboard
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}