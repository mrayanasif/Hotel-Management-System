import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ManageBookings() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/users/all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  const [rooms, setRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/rooms/all-rooms",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };
  const [services, setServices] = useState([]);

  const [bookings, setBookings] = useState([]);
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/hotelservice/all-services",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setServices(response.data.services);
    } catch (error) {
      console.log(error);
    }
  };
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const handleCreateBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/bookings/admin-create-booking",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Booking Created Successfully");

      setIsCreateOpen(false);

      fetchBookings();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to create booking");
    }
  };
  const [filter, setFilter] = useState("All");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [formData, setFormData] = useState({
    user: "",
    room: "",
    services: [],
    checkIn: "",
    checkOut: "",
    bookingStatus: "",
  });
  // Fetch Bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/bookings/all-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setBookings(response.data.bookings);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchUsers();
    fetchRooms();
    fetchServices();
  }, []);
  // Filter
  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter((booking) => booking.bookingStatus === filter);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/bookings/admin-update/${selectedBooking._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Booking Updated Successfully");

      setIsEditOpen(false);

      fetchBookings();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Failed to update booking");
    }
  };
  const handleRoomChange = (e) => {
    const roomId = e.target.value;

    setFormData({
      ...formData,
      room: roomId,
    });

    const selectedRoom = rooms.find((room) => room._id === roomId);

    if (selectedRoom) {
      setSelectedRoomType(selectedRoom.roomType);
    }
  };
  const handleServices = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        services: [...formData.services, value],
      });
    } else {
      setFormData({
        ...formData,
        services: formData.services.filter((id) => id !== value),
      });
    }
  };

  const handleDeleteBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/bookings/delete/${selectedBooking._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Booking Deleted Successfully");

      setIsDeleteOpen(false);

      fetchBookings();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete booking");
    }
  };

  return (
    <>
      <div className="p-8">
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold font-serif uppercase">
              Booking Management
            </h1>

            <p className="text-gray-500">Manage all hotel bookings</p>
          </div>

          <div className="flex justify-between items-center gap-5 mb-6">
            <div className="bg-white shadow rounded-xl px-9 py-5 text-center">
              <p className="text-gray-500 text-sm">Total Bookings</p>

              <h2 className="text-3xl font-bold text-[#C8A96A]">
                {bookings.length}
              </h2>
            </div>

            <button
              onClick={() => {
                setFormData({
                  user: "",
                  room: "",
                  services: [],
                  checkIn: "",
                  checkOut: "",
                  bookingStatus: "Pending",
                });

                setSelectedRoomType("");
                setIsCreateOpen(true);
              }}
              className="bg-[#28d325] hover:bg-[#08650a] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
            >
              Create Booking
            </button>
          </div>
        </div>

        {/* Filter */}

        <div className="flex justify-end mb-5">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full">
            <thead className="bg-[#1B1B1B] text-[#C8A96A] uppercase ">
              <tr>
                <th className="px-4 py-4 whitespace-nowrap">Customer</th>
                <th className="px-4 py-4 whitespace-nowrap">Room No</th>
                <th className="px-4 py-4 whitespace-nowrap">Room Type</th>
                <th className="px-4 py-4 whitespace-nowrap">Services</th>
                <th className="px-4 py-4 whitespace-nowrap">Check In</th>
                <th className="px-4 py-4 whitespace-nowrap">Check Out</th>
                <th className="px-4 py-4 whitespace-nowrap">Total</th>
                <th className="px-4 py-4 whitespace-nowrap">Status</th>
                <th className="px-4 py-4 whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="px-4 py-4">{booking.user?.name}</td>

                    <td className="px-4">{booking.room?.roomNumber}</td>

                    <td className="px-4">{booking.room?.roomType}</td>

                    {/* Services */}
                    <td className="px-4">
                      {booking.services && booking.services.length > 0
                        ? booking.services
                            .map(
                              (service) => service.serviceName || service.name,
                            )
                            .join(", ")
                        : "No Services"}
                    </td>

                    {/* Check In */}
                    <td className="px-4 whitespace-nowrap">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </td>

                    {/* Check Out */}
                    <td className="px-4 whitespace-nowrap">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </td>

                    {/* Total */}
                    <td className="px-4 whitespace-nowrap font-semibold">
                      Rs. {Number(booking.totalPrice).toLocaleString("en-PK")}
                    </td>

                    {/* Status */}
                    <td className="px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-extrabold ${
                          booking.bookingStatus === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.bookingStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : booking.bookingStatus === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);

                            setFormData({
                              user: booking.user?._id || "",
                              room: booking.room?._id || "",
                              services: booking.services
                                ? booking.services.map((service) => service._id)
                                : [],
                              checkIn: booking.checkIn.split("T")[0],
                              checkOut: booking.checkOut.split("T")[0],
                              bookingStatus: booking.bookingStatus,
                            });

                            setSelectedRoomType(booking.room?.roomType || "");

                            setIsEditOpen(true);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setIsDeleteOpen(true);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8">
                    No Bookings Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modals  */}
      {/* update booking Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[700px] rounded-xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 uppercase font-serif text-amber-500 ">
              Update Booking
            </h2>

            <div className="grid grid-cols-2 gap-5">
              {/* Customer */}

              <div>
                <label className="font-semibold">Customer</label>

                <div className="w-full mt-2 border rounded-lg p-3 bg-gray-100 text-amber-900">
                  {selectedBooking?.user?.name}
                </div>
              </div>

              {/* Room */}

              <div>
                <label className="font-semibold">Room Number</label>

                <select
                  name="room"
                  value={formData.room}
                  onChange={handleRoomChange}
                  className="w-full mt-2 border rounded-lg p-3  text-amber-900"
                >
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      Room {room.roomNumber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Type */}

              <div>
                <label className="font-semibold">Room Type</label>

                <input
                  type="text"
                  value={selectedRoomType}
                  readOnly
                  className="w-full mt-2 border rounded-lg p-3 bg-gray-100  text-amber-900"
                />
              </div>

              {/* Booking Status */}

              <div>
                <label className="font-semibold">Booking Status</label>

                <select
                  name="bookingStatus"
                  value={formData.bookingStatus}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3  text-amber-900"
                >
                  <option value="Pending">Pending</option>

                  <option value="Confirmed">Confirmed</option>

                  <option value="Completed">Completed</option>

                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Check In */}

              <div>
                <label className="font-semibold">Check In</label>

                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>

              {/* Check Out */}

              <div>
                <label className="font-semibold">Check Out</label>

                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>
            </div>

            {/* Services */}

            <div className="mt-6">
              <label className="font-semibold block mb-3">Hotel Services</label>

              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <label key={service._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={service._id}
                      checked={formData.services.includes(service._id)}
                      onChange={handleServices}
                    />

                    {service.serviceName}
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={handleUpdateBooking}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-800"
              >
                Update Booking
              </button>
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Booking Modal  */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] text-center">
            <h2 className="text-2xl font-bold mb-3">Delete Booking</h2>

            <p className="text-gray-500">
              Are you sure you want to delete this booking?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteBooking}
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Booking Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[700px] rounded-xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 font-serif uppercase text-amber-500">
              Create Booking
            </h2>

            <div className="grid grid-cols-2 gap-5">
              {/* Customer */}
              <div>
                <label className="font-semibold">Customer</label>

                <select
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option value="">Select Guest</option>

                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room */}
              <div>
                <label className="font-semibold">Room Number</label>

                <select
                  name="room"
                  value={formData.room}
                  onChange={handleRoomChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option value="">Select Room</option>

                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      Room {room.roomNumber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Type */}
              <div>
                <label className="font-semibold">Room Type</label>

                <input
                  type="text"
                  value={selectedRoomType}
                  readOnly
                  className="w-full mt-2 border rounded-xl p-2 bg-gray-100"
                />
              </div>

              {/* Empty Space */}
              <div></div>

              {/* Check In */}
              <div>
                <label className="font-semibold">Check In</label>

                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>

              {/* Check Out */}
              <div>
                <label className="font-semibold">Check Out</label>

                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>
            </div>

            {/* Hotel Services */}
            <div className="mt-6">
              <label className="font-semibold block mb-3">Hotel Services</label>

              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <label key={service._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={service._id}
                      checked={formData.services.includes(service._id)}
                      onChange={handleServices}
                    />

                    {service.serviceName}
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsCreateOpen(false)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateBooking}
                className="px-6 py-3 bg-[#2c7b1a] text-white rounded-lg hover:bg-[#37681b]"
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageBookings;
