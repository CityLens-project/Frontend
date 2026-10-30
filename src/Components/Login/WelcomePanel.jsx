import { ShieldCheck } from 'lucide-react'
import logoIcon from '../../assets/citylens_icon.png'
import logoText from '../../assets/citylens_text_transparent.png'
import cityMap from '../../assets/Sadat City Traffic Map Infographic.png'

export default function WelcomePanel() {
  return (
    <aside className="flex flex-col gap-6 bg-secondary p-6 md:min-h-screen md:w-2/5 md:shrink-0 md:p-8 xl:w-[600px] xl:gap-9 xl:p-[50px]">
      <div className="flex items-center">
        <img src={logoIcon} alt="" className="h-12 w-auto xl:h-[62px]" />
        <img src={logoText} alt="CityLens" className="h-7 w-auto xl:h-[38px]" />
      </div>

      <div className="flex flex-col gap-4 md:pt-6 xl:gap-5 xl:pt-[54px]">
        <h2 className="text-2xl font-bold leading-snug text-white md:text-3xl xl:text-[42px]">
          Your city, your voice.
          <br />
          A Smarter City Starts With You.
        </h2>
        <p className="text-sm leading-relaxed text-white/80 xl:text-base">
          Explore your city, understand what’s happening on its roads, and make
          smarter decisions for a safer, easier journey. Together, we can build a
          better tomorrow.
        </p>
      </div>

      <img
        src={cityMap}
        alt=""
        className="aspect-video w-full rounded-3xl object-cover"
      />

      <div className="flex items-center gap-3">
        <ShieldCheck size={24} className="shrink-0 text-success" aria-hidden="true" />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-white">
            One city. One vision. A smarter tomorrow.
          </p>
          <p className="text-xs text-white/80">
            <span className="font-extrabold">CityLens</span> · AI-Powered Smart City Platform
          </p>
        </div>
      </div>
    </aside>
  )
}