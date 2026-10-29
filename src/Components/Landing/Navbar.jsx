import { Link } from 'react-router-dom'
import logoIcon from '../../assets/citylens_icon.png'
import logoText from '../../assets/citylens_text_transparent.png'

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link to="/" aria-label="CityLens home" className="flex items-center gap-2">
          <img src={logoIcon} alt="" className="h-10 w-auto sm:h-12" />
          <img src={logoText} alt="CityLens" className="h-6 w-auto sm:h-8" />
        </Link>

        <Link
          to="/login"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 sm:px-6 sm:text-base"
        >
          Log In
        </Link>
      </nav>
    </header>
  )
}
