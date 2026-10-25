import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRoom = location.state?.room;
  const selectedService = location.state?.service;

  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    roomType: "",
    room: "",
    checkIn: "",
    checkOut: "",
    services: [],
  });

  const [roomPrice, setRoomPrice] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  // ================= Fetch Rooms =================

  const fetchRooms = async () => {
    try {
      const response = await api.get("/rooms/all-rooms");

      setRooms(response.data.rooms);
    } catch (error) {
      toast.error("Unable To Load Rooms");
    }
  };

  // ================= Fetch Services =================

  const fetchServices = async () => {
    try {
      const response = await api.get("/hotelservice/all-services");

      setServices(response.data.services);
    } catch (error) {
      toast.error("Unable To Load Services");
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchServices();
  }, []);
// if user clicks directly from the page 
  useEffect(() => {
    if (selectedRoom) {
      setFormData((prev) => ({
        ...prev,
        roomType: selectedRoom.roomType,
        room: selectedRoom._id,
      }));
    }
  }, [selectedRoom]);
  useEffect(() => {
  if (selectedService) {
    setFormData((prev) => ({
      ...prev,
      services: [selectedService._id],
    }));
  }
}, [selectedService]);
  // ================= Filter Available Rooms =================

  const filteredRooms = useMemo(() => {
    return rooms.filter(
      (room) =>
        room.roomType === formData.roomType &&
        room.availability === "Available",
    );
  }, [rooms, formData.roomType]);

  // ================= Input Change =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "roomType" && {
        room: "",
      }),
    }));
  };

  // ================= Select / Unselect Services =================

  const handleServiceChange = (serviceId) => {
    if (formData.services.includes(serviceId)) {
      setFormData((prev) => ({
        ...prev,
        services: prev.services.filter((id) => id !== serviceId),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, serviceId],
      }));
    }
  };

  // ================= Live Price =================

  useEffect(() => {
    if (!formData.room || !formData.checkIn || !formData.checkOut) {
      setRoomPrice(0);
      setServicePrice(0);
      setTotalPrice(0);
      setTotalDays(0);

      return;
    }

    const selectedRoom = rooms.find((room) => room._id === formData.room);

    if (!selectedRoom) return;

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    const difference = checkOutDate - checkInDate;

    const days = difference / (1000 * 60 * 60 * 24);

    if (days <= 0) {
      setRoomPrice(0);
      setServicePrice(0);
      setTotalPrice(0);
      setTotalDays(0);

      return;
    }

    setTotalDays(days);

    const roomCharges = selectedRoom.price * days;

    const selectedServices = services.filter((service) =>
      formData.services.includes(service._id),
    );

    const serviceCharges = selectedServices.reduce(
      (sum, service) => sum + service.price,
      0,
    );

    setRoomPrice(roomCharges);
    setServicePrice(serviceCharges);
    setTotalPrice(roomCharges + serviceCharges);
  }, [formData, rooms, services]);

  // ================= Submit Booking =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/bookings/create-booking",
        {
          room: formData.room,
          services: formData.services,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success(response.data.message);

      navigate("/bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-2 gap-10">
        {/* ================= Left Card ================= */}

        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h2 className="text-3xl font-bold mb-8">Booking Details</h2>

          {/* Room Type */}

          <div className="mb-6">
            <label className="block font-semibold mb-2">Room Type</label>

            <select
              disabled={!!selectedRoom}
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-4 focus:border-amber-500 outline-none"
            >
              <option value="">Select Room Type</option>

              <option value="Single">Single</option>

              <option value="Double">Double</option>

              <option value="Deluxe">Deluxe</option>

              <option value="Suite">Suite</option>
            </select>
          </div>

          {/* Available Rooms */}

          <div className="mb-6">
            <label className="block font-semibold mb-2">Available Rooms</label>

            <select
              disabled={!!selectedRoom}
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-4 focus:border-amber-500 outline-none"
            >
              <option value="">Select Available Room</option>

              {selectedRoom ? (
                <option value={selectedRoom._id}>
                  Room {selectedRoom.roomNumber} • Rs.{selectedRoom.price}/night
                </option>
              ) : (
                filteredRooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    Room {room.roomNumber} • Rs.{room.price}/night
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Dates */}

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block font-semibold mb-2">Check In</label>

              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border border-gray-300 p-4 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Check Out</label>

              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                min={
                  formData.checkIn
                    ? formData.checkIn
                    : new Date().toISOString().split("T")[0]
                }
                className="w-full rounded-xl border border-gray-300 p-4 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          {/* Services */}

          <h3 className="text-2xl font-bold mb-5">Additional Services</h3>

          <div className="grid gap-4">
            {services.map((service) => (
              <label
                key={service._id}
                className="flex justify-between items-center border rounded-2xl p-5 hover:border-amber-500 cursor-pointer transition"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service._id)}
                    onChange={() => handleServiceChange(service._id)}
                    className="accent-amber-500"
                  />

                  <div>
                    <h4 className="font-semibold">{service.serviceName}</h4>

                    <p className="text-gray-500 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>

                <span className="text-amber-600 font-bold">
  Rs. {Number(service.price).toLocaleString("en-PK")}
                </span>
              </label>
            ))}
          </div>
        </div>
        {/* ================= Right Card ================= */}

        <div className="bg-white rounded-3xl shadow-xl p-10 h-fit sticky top-28">
          <h2 className="text-3xl font-bold mb-8">Booking Summary</h2>

          {/* Room Type */}

          <div className="flex justify-between mb-5">
            <span className="text-gray-600">Room Type</span>

            <span className="font-semibold">{formData.roomType || "-"}</span>
          </div>

          {/* Room */}

          <div className="flex justify-between mb-5">
            <span className="text-gray-600">Room</span>

            <span className="font-semibold">
              {formData.room
                ? filteredRooms.find((room) => room._id === formData.room)
                    ?.roomNumber
                : "-"}
            </span>
          </div>

          {/* Check In */}

          <div className="flex justify-between mb-5">
            <span className="text-gray-600">Check In</span>

            <span className="font-semibold">{formData.checkIn || "-"}</span>
          </div>

          {/* Check Out */}

          <div className="flex justify-between mb-5">
            <span className="text-gray-600">Check Out</span>

            <span className="font-semibold">{formData.checkOut || "-"}</span>
          </div>

          {/* Nights */}

          <div className="flex justify-between mb-5">
            <span className="text-gray-600">Total Nights</span>

            <span className="font-semibold">{totalDays}</span>
          </div>

          <hr className="my-6" />

          {/* Selected Services */}

          <h3 className="text-xl font-bold mb-4">Selected Services</h3>

          {formData.services.length === 0 ? (
            <p className="text-gray-500 mb-5">No Services Selected</p>
          ) : (
            services

              .filter((service) => formData.services.includes(service._id))

              .map((service) => (
                <div key={service._id} className="flex justify-between mb-3">
                  <span>{service.serviceName}</span>

                  <span>Rs. {service.price}</span>
                </div>
              ))
          )}

          <hr className="my-6" />

          {/* Price */}

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Room Charges</span>

              <span>Rs. {roomPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Service Charges</span>

              <span>Rs. {servicePrice}</span>
            </div>

            <div className="flex justify-between text-2xl font-bold text-amber-600 border-t pt-5">
              <span>Grand Total</span>

              <span>Rs. {totalPrice}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-10 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold text-lg hover:scale-105 transition duration-300"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </form>
  );
}

export default BookingForm;
