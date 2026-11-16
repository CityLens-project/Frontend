import logoIcon from '../../assets/citylens_icon.png'
import logoText from '../../assets/citylens_text_transparent.png'

export default function WelcomePanel() {
  return (
    <aside className="bg-white p-6 md:px-8 md:py-[clamp(24px,5vh,50px)] xl:px-[50px]">
      <div className="flex items-center gap-1">
        <img
          src={logoIcon}
          alt=""
          className="h-12 w-auto xl:h-[clamp(44px,7.5vh,62px)]"
        />
        <img
          src={logoText}
          alt="CityLens"
          className="h-7 w-auto xl:h-[clamp(26px,4.5vh,38px)]"
        />
      </div>
    </aside>
  )
}