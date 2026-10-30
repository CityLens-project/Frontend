export default function LandingFooter() {
  return (
    <footer className="bg-white">
      <p className="mx-auto max-w-7xl px-4 py-8 text-center text-base text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} CityLens. All rights reserved.
      </p>
    </footer>
  )
}