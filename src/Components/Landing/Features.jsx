import { Map, Sparkles, MessageSquare } from 'lucide-react'
import FeatureCard from './FeatureCard'

const features = [
  {
    icon: Map,
    title: 'Monitor your city',
    text: 'View traffic conditions, road issues, and city updates on one map.',
  },
  {
    icon: Sparkles,
    title: 'Manage reports',
    text: 'Review citizen reports and track issue resolution.',
  },
  {
    icon: MessageSquare,
    title: 'Make data-driven decisions',
    text: 'Use AI-powered insights to support better city management.',
  },
]

export default function Features() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:w-[450px] lg:shrink-0">
            <span className="inline-block rounded-full bg-success/10 px-3 py-1 text-[12px] font-semibold text-success">
              Meet CityLens
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-secondary">
              City insights, made useful for everyone.
            </h2>
          </div>

          <p className="text-base text-slate-500 lg:flex-1">
            CityLens is a smart city platform connecting maps, AI insights, and
            citizen reports.
          </p>
        </div>

        <div className="mt-10 grid gap-card md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
