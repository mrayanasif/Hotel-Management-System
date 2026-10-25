import { useContext } from "react";
import { Menu, UserCircle2, CalendarDays } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const { user } = useContext(AuthContext);

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-8 py-5">
        {/* LEFT */}

        <div className="flex items-center gap-5">
          <button
            onClick={toggleSidebar}
            className="w-11 h-11 rounded-xl bg-[#F8F5F0] hover:bg-[#C8A96A] hover:text-white transition flex items-center justify-center"
          >
            <Menu size={24} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-[#1F1F1F] font-serif">
              Admin Access
            </h1>

            <p className="text-gray-500">{greeting}, Welcome to Luxury Stay</p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-8">
          {/* DATE */}

          <div className="hidden xl:flex items-center gap-2 text-gray-600">
            <CalendarDays size={18} className="text-[#C8A96A]" />

            <span>{today}</span>
          </div>

          {/* USER */}

          <div className="flex items-center gap-3">
            <UserCircle2 size={46} className="text-[#C8A96A]" />

            <div className="hidden md:block">
              <h3 className="font-extrabold uppercase text-[#1F1F1F]">
                Welcome, {user?.name || "Guest"}
              </h3>

              <p className="text-sm text-gray-500">Luxury Stay</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
