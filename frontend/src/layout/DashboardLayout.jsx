import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">

      <Sidebar sidebarOpen={sidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-24"
        }`}
      >
        <Navbar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <main className="p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;