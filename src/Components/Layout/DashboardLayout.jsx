import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default DashboardLayout;
