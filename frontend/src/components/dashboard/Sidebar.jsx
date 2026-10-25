import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BedDouble,
  CalendarCheck,
  MessageSquare,
  Bell,
  Wrench,
  Receipt,
  LogOut,
  UserCog,
  Hotel,
  Globe,
  BrushCleaningIcon,
} from "lucide-react";

const Sidebar = ({ sidebarOpen }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={22} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={22} />,
    },
    {
      name: "Rooms",
      path: "/admin/rooms",
      icon: <BedDouble size={22} />,
    },
    {
      name: "HouseKeeping",
      path: "/housekeeping",
      icon: <BrushCleaningIcon size={22} />,
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <CalendarCheck size={22} />,
    },
    {
      name: "Feedback",
      path: "/admin/feedback",
      icon: <MessageSquare size={22} />,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: <Bell size={22} />,
    },
    {
      name: "Maintenance",
      path: "/admin/maintenance",
      icon: <Wrench size={22} />,
    },
    {
      name: "Invoice",
      path: "/admin/invoice",
      icon: <Receipt size={22} />,
    },
    {
    name: "Staff",
    path: "/admin/staff",
    icon: <UserCog size={22} />,
},
    {
      name: "Visit Website",
      icon: <Globe size={22} />,
      path: "/",
    },
  ];
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login", { replace: true });
  };
  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#181818] border-r border-[#2A2A2A] transition-all duration-300 z-50 ${
        sidebarOpen ? "w-72" : "w-24"
      }`}
    >
      {/* Logo */}

      <div className="h-24 border-b border-[#2A2A2A] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#C8A96A] p-3 rounded-xl">
            <Hotel className="text-black" size={28} />
          </div>

          {sidebarOpen && (
            <div>
              <h1
                className="text-[#C8A96A] text-2xl font-bold font-serif uppercase
"
              >
                Luxury Stay
              </h1>

              <p
                className="text-gray-400 text-sm font-serif
"
              >
                Admin Panel
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}

      <div className="px-3 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center ${
                sidebarOpen ? "justify-start px-4" : "justify-center"
              } gap-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-[#C8A96A] text-black font-semibold shadow-lg"
                  : "text-gray-300 hover:bg-[#252525] hover:text-[#C8A96A]"
              }`
            }
          >
            {item.icon}

            {sidebarOpen && <span className="text-[15px]">{item.name}</span>}
          </NavLink>
        ))}
      </div>

      {/* Logout */}

      <div
        onClick={handleLogout}
        className="absolute bottom-6 left-0 w-full px-3 cursor-pointer"
      >
        <button
          className={`w-full bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 shadow hover:shadow-lg hover:scale-105 py-3  flex items-center ${
            sidebarOpen ? "justify-center gap-3" : "justify-center"
          }`}
        >
          <LogOut size={20} />

          {sidebarOpen && "LOGOUT"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
