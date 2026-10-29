import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <span className="inline-block rounded-full bg-success/10 px-3 py-1 text-[12px] font-semibold text-success">
            Smarter streets. Stronger communities.
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-secondary text-[52px] lg:text-6xl">
            A better city starts with you.
          </h1>

          <p className="mt-6 text-[18px] text-slate-500">
            Explore your city, find better routes, and report road issues with
            ease.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-block rounded-lg bg-primary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Explore smart map
          </Link>
        </div>

        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-secondary">
              CityLens at a glance
            </h2>
          </div>

          <div className="mt-5 h-64 w-full rounded-2xl bg-slate-100 sm:h-80" />
        </article>
      </div>
    </section>
  );
}
