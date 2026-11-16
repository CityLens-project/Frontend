import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

function Topbar() {
  const location = useLocation();

  const pageTitles = {
    "/dashboard/overview": "Overview",
    "/dashboard/traffic-analytics": "Traffic analytics",
    "/dashboard/road-conditions": "Road conditions",
    "/dashboard/ai-predictions": "AI predictions",
    "/dashboard/complaints": "Complaints",
    "/dashboard/smart-map": "Smart map",
  };

  const pageTitle = pageTitles[location.pathname] || "Overview";
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(currentDate).replace(",", " ·");

  return (
    <nav className="w-full h-20 bg-white border-b border-gray-200 px-6 md:px-10 lg:px-14 flex items-center justify-between shadow-sm relative z-20">

      <div className="text-[#71829F] text-lg md:text-xl font-medium">
        Sadat City / {pageTitle}
      </div>

      <div className="flex items-center gap-4 md:gap-8">

        <div className="hidden sm:flex items-center justify-center bg-[#EAF7F5] text-[#25A99A] rounded-full px-4 py-2 font-semibold text-sm">
          Live city data
        </div>

        <span className="hidden md:block text-[#71829F] text-base lg:text-lg whitespace-nowrap">
          {formattedDate}
        </span>

        <button
          className="text-[#71829F] hover:text-[#25A99A] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={22} strokeWidth={1.7} />
        </button>

        <div className="w-10 h-10 rounded-full bg-[#EAF7F5] flex items-center justify-center text-[#25A99A] font-semibold text-sm">
          SM
        </div>

      </div>
    </nav>
  );
}

export default Topbar;
