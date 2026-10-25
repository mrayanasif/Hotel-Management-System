import { useEffect, useState } from "react";
import api from "../api/axios";

// icons from react
import {
  Users,
  BedDouble,
  CalendarCheck,
  MessageSquare,
  Bell,
  Wrench,
  ArrowRight,
} from "lucide-react";
// charts for revenue
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  // connecting to database
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRooms: 0,
    totalBookings: 0,
    totalFeedback: 0,
    totalServices: 0,
    totalMaintenance: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard/recent-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecentBookings(response.data.bookings);
    } catch (error) {
      console.log(error.response?.status);
    }
  };

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/rooms/all-rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRevenueData(response.data.revenueData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();

    fetchRecentBookings();

    fetchRooms();

    fetchRevenue();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}

      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#1B1B1B] via-[#694e0f] to-[#0f1107] p-10 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#C8A96A]/10 blur-3xl"></div>

        <div className="relative z-10">
          <h1
            className="text-4xl font-bold font-serif
 uppercase"
          >
            Welcome Back !
          </h1>

          <p className="mt-3 text-lg text-gray-300 uppercase">
            Luxury Stay Hotel Management Dashboard
          </p>

          <p className="mt-2 max-w-xl text-gray-400 uppercase">
            Manage guests, reservations, rooms, hotel services, maintenance
            requests and everything from one place.
          </p>

          <button className="mt-8 flex items-center gap-2 rounded-xl bg-[#C8A96A] px-6 py-3 font-semibold text-black transition hover:scale-105">
            Explore Dashboard
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Users */}

        <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-500 font-extrabold uppercase ">
                Total Users
              </p>

              <h2 className="mt-2 text-4xl font-bold">{stats.totalUsers}</h2>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4">
              <Users size={30} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Rooms */}

        <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-extrabold uppercase ">Rooms</p>

              <h2 className="mt-2 text-4xl font-bold">{stats.totalRooms}</h2>
            </div>

            <div className="rounded-2xl bg-green-100 p-4">
              <BedDouble size={30} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Bookings */}

        <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-500 font-extrabold uppercase">
                Bookings
              </p>

              <h2 className="mt-2 text-4xl font-bold">{stats.totalBookings}</h2>
            </div>

            <div className="rounded-2xl bg-orange-100 p-4">
              <CalendarCheck size={30} className="text-orange-600" />
            </div>
          </div>
        </div>

        {/* Feedback */}

        <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-500 font-extrabold uppercase">
                Feedback
              </p>

              <h2 className="mt-2 text-4xl font-bold">{stats.totalFeedback}</h2>
            </div>

            <div className="rounded-2xl bg-purple-100 p-4">
              <MessageSquare size={30} className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Services */}

        <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-500 font-extrabold uppercase">
                Services
              </p>

              <h2 className="mt-2 text-4xl font-bold">{stats.totalServices}</h2>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-4">
              <Bell size={30} className="text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Maintenance */}

        <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-500 font-extrabold">Maintenance</p>

              <h2 className="mt-2 text-4xl font-bold">
                {stats.totalMaintenance}
              </h2>
            </div>

            <div className="rounded-2xl bg-red-100 p-4">
              <Wrench size={30} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* recent Booking  */}
      <div className="bg-white w-full rounded-3xl shadow-lg mt-10 overflow-hidden">
        <div className="px-8 py-6 border-b">
          <h2
            className="text-2xl font-bold text-gray-800 font-serif
 uppercase"
          >
            Recent Bookings
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-[#1B1B1B] text-[#C8A96A] uppercase">
            <tr>
              <th className="py-4">Guest</th>

              <th>Room</th>

              <th>Price</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="py-4 text-center">{booking.user?.name}</td>

                <td className="text-center">{booking.room?.roomNumber}</td>

                <td className="text-center">Rs {booking.room?.price}</td>

                <td className="text-center">
  <span
    className={`px-3 py-1 rounded-full text-sm font-extrabold ${
      booking.bookingStatus === "Confirmed"
        ? "bg-green-100 text-green-700"
        : booking.bookingStatus === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : booking.bookingStatus === "Cancelled"
        ? "bg-red-100 text-red-700"
        : booking.bookingStatus === "Completed"
        ? "bg-blue-100 text-blue-700"
        : "bg-gray-100 text-gray-700"
    }`}
  >
    {booking.bookingStatus}
  </span>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* rooms  */}
      <div className="mt-8 w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Room Status */}

        <div className="bg-white w-full rounded-3xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b">
            <h2
              className="text-2xl font-bold font-serif
 uppercase"
            >
              Room Status
            </h2>
          </div>

          <table className="w-full">
            <thead className="bg-[#1B1B1B] text-[#C8A96A] uppercase">
              <tr>
                <th className="py-4">Room</th>

                <th>Type</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room._id} className="border-b">
                  <td className="text-center py-3">{room.roomNumber}</td>

                  <td className="text-center">{room.roomType}</td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-extrabold ${
                        room.availability === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {room.availability}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Revenue Chart */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Monthly Revenue</h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="income" fill="#C8A96A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
