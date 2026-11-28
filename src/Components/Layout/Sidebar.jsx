import { NavLink } from "react-router-dom";
import logoIcon from "../../assets/citylens_icon.png";
import logoText from "../../assets/citylens_text_transparent.png";

import {
  LayoutDashboard,
  ChartNoAxesColumnIncreasing,
  Route,
  Sparkles,
  MessageSquare,
  Map,
  FlaskConical,
} from "lucide-react";

function Sidebar() {
  const navItems = [
    { name: "Overview", path: "/dashboard/overview", icon: LayoutDashboard },
    { name: "Traffic analytics", path: "/dashboard/traffic-analytics", icon: ChartNoAxesColumnIncreasing },
    { name: "Road conditions", path: "/dashboard/road-conditions", icon: Route },
    { name: "AI predictions", path: "/dashboard/ai-predictions", icon: Sparkles },
    { name: "Complaints", path: "/dashboard/complaints", icon: MessageSquare },
    { name: "Open smart map", path: "/dashboard/smart-map", icon: Map },
    { name: "DSS & Simulation", path: "/dashboard/decision-support", icon: FlaskConical },
  ];

  return (
    <aside className="w-[250px] min-w-[250px] min-h-screen bg-white flex flex-col px-5 py-6 border-r border-gray-200 shadow-sm relative z-10">

      <div className="flex items-center justify-center gap-2 mb-9">
        <img
          src={logoIcon}
          alt="CityLens"
          className="w-[55px] h-[55px] object-contain"
        />
        <img
          src={logoText}
          alt="CityLens"
          className="w-[110px] object-contain"
        />
      </div>

      <h2 className="text-[#71829F] text-[16px] font-medium mb-7">
        Sadat City Council
      </h2>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 min-h-[55px]
                rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-[#EFF6FF] text-[#3985FF] font-semibold"
                    : "text-[#71829F] hover:bg-gray-50"
                }`
              }
            >
              <Icon size={22} strokeWidth={1.7} />
              <span className="text-[15px]">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto px-3">
        <h3 className="text-[#263445] text-[17px] font-semibold">
          Sara Mahmoud
        </h3>

        <p className="text-[#71829F] text-[14px] mt-1">
          City administrator
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
