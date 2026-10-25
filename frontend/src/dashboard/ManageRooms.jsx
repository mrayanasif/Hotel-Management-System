import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Wifi,
  Tv,
  Coffee,
  ParkingCircle,
  Dumbbell,
  Waves,
  AirVent,
  Bell,
  UtensilsCrossed,
  Car,
  Volleyball,
  TreePalmIcon,
  BathIcon,
} from "lucide-react";
function ManageRooms() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All");
  const amenitiesList = [
    { name: "Free WiFi", icon: Wifi },
    { name: "Smart TV", icon: Tv },
    { name: "Breakfast", icon: Coffee },
    { name: "Parking", icon: ParkingCircle },
    { name: "Swimming Pool", icon: Waves },
    { name: "Gym", icon: Dumbbell },
    { name: "Air Conditioner", icon: AirVent },
    { name: "Room Service", icon: Bell },
    { name: "Complimentry Breakfast", icon: UtensilsCrossed },
    { name: "Pickup", icon: Car },
    { name: "Play Area", icon: Volleyball },
    { name: "View", icon: TreePalmIcon },
    { name: "bath", icon: BathIcon },
  ];
  // updating and deleting modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);

  // room adding modal
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    price: "",
    floor: "",
    availability: "",
    description: "",
    amenities: [],
  });
  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/rooms/all-rooms",
      );

      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch rooms");
    }
  };
  const filteredRooms =
    filter === "All" ? rooms : rooms.filter((room) => room.roomType === filter);
  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAmenities = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value],
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((item) => item !== value),
      });
    }
  };
  const handleUpdateRoom = async () => {
    try {
      const token = localStorage.getItem("token");

      const updatedRoom = new FormData();

      updatedRoom.append("roomNumber", formData.roomNumber);
      updatedRoom.append("roomType", formData.roomType);
      updatedRoom.append("price", formData.price);
      updatedRoom.append("floor", formData.floor);
      updatedRoom.append("availability", formData.availability);
      updatedRoom.append("description", formData.description);

      formData.amenities.forEach((item) => {
        updatedRoom.append("amenities", item);
      });

      if (image) {
        updatedRoom.append("image", image);
      }

      await axios.put(
        `http://localhost:5000/api/rooms/update/${selectedRoom._id}`,
        updatedRoom,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Room Updated Successfully");

      setIsEditOpen(false);

      fetchRooms();
    } catch (error) {
      console.log(error);

      toast.error("Failed to update room");
    }
  };
  const handleDeleteRoom = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/rooms/delete/${selectedRoom._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Room Deleted Successfully");

      setIsDeleteOpen(false);

      fetchRooms();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete room");
    }
  };
  // room addition
  const handleAddRoom = async () => {
    try {
      const token = localStorage.getItem("token");

      // ================= Validations =================

      if (!formData.roomNumber) {
        toast.error("Room number is required");
        return;
      }

      if (Number(formData.roomNumber) <= 0) {
        toast.error("Invalid Room Number");
        return;
      }

      if (!formData.roomType) {
        toast.error("Please select a room type");
        return;
      }

      if (!formData.price) {
        toast.error("Price is required");
        return;
      }

      if (Number(formData.price) <= 0) {
        toast.error("Invalid Price");
        return;
      }

      if (!formData.floor) {
        toast.error("Floor number is required");
        return;
      }

      if (Number(formData.floor) <= 0) {
        toast.error("Floor number must be greater than 0");
        return;
      }

      if (!formData.description.trim()) {
        toast.error("Description is required");
        return;
      }

      if (formData.amenities.length === 0) {
        toast.error("Please select at least one amenity");
        return;
      }

      if (!image) {
        toast.error("Please upload a room image");
        return;
      }

      // ================= FormData =================

      const newRoom = new FormData();

      newRoom.append("roomNumber", formData.roomNumber);
      newRoom.append("roomType", formData.roomType);
      newRoom.append("price", formData.price);
      newRoom.append("floor", formData.floor);
      newRoom.append("availability", formData.availability);
      newRoom.append("description", formData.description);

      formData.amenities.forEach((item) => {
        newRoom.append("amenities", item);
      });

      newRoom.append("image", image);

      // ================= API Call =================

      await axios.post("http://localhost:5000/api/rooms/add-room", newRoom, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Room Added Successfully");

      // Close Modal

      setIsAddOpen(false);

      // Reset Form

      setFormData({
        roomNumber: "",
        roomType: "",
        price: "",
        floor: "",
        availability: "Available",
        description: "",
        amenities: [],
      });

      setImage(null);

      // Refresh Table

      fetchRooms();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Failed to add room");
    }
  };
  return (
    <>
      <div className="p-8">
        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold font-serif uppercase">
              Rooms Management
            </h1>

            <p className="text-gray-500 mt-1">Manage all hotel rooms</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white shadow-md rounded-xl px-10 py-3 text-center">
              <p className="text-sm text-gray-500">Total Rooms</p>

              <h2 className="text-3xl font-bold text-[#9e8b11]">
                {rooms.length}
              </h2>
            </div>

            <button
              onClick={() => {
                setFormData({
                  roomNumber: "",
                  roomType: "",
                  price: "",
                  floor: "",
                  availability: "Available",
                  description: "",
                  amenities: [],
                });

                setImage(null);

                setIsAddOpen(true);
              }}
              className="bg-[#28d325] hover:bg-[#08650a] text-white px-5 py-5 rounded-xl shadow-md transition-all duration-300"
            >
              Add Room
            </button>
          </div>
        </div>

        {/* Filter Buttons */}

        <div className="flex gap-3 mb-8 flex-wrap">
          {["All", "Single", "Double", "Deluxe", "Suite"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
                filter === type
                  ? "bg-[#aa7e25] text-white shadow-lg"
                  : "bg-white border hover:bg-[#C8A96A] hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#1B1B1B] text-[#C8A96A]">
              <tr>
                <th className="py-4">Image</th>
                <th>Room No</th>
                <th>Room Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr
                    key={room._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 text-center">
                      <img
                        src={`http://localhost:5000/uploads/${room.image}`}
                        alt={room.roomType}
                        className="w-24 h-16 object-cover rounded-lg mx-auto shadow"
                      />
                    </td>

                    <td className="text-center">{room.roomNumber}</td>

                    <td className="text-center">{room.roomType}</td>

                    <td className="text-center">
                      Rs. {Number(room.price).toLocaleString("en-PK")}
                    </td>

                    <td className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          room.availability === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {room.availability}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedRoom(room);

                            setFormData({
                              roomNumber: room.roomNumber,
                              roomType: room.roomType,
                              price: room.price,
                              floor: room.floor,
                              availability: room.availability,
                              description: room.description,
                              amenities: room.amenities,
                            });

                            setImage(null);
                            setIsEditOpen(true);
                          }}
                          className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:scale-105"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => {
                            setSelectedRoom(room);
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
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* ================= Update Room Modal ================= */}

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-center uppercase">
              Update Room
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Room Number */}

              <div>
                <label className="font-semibold">Room Number</label>
                <input
                  type="number"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              {/* Room Type */}

              <div>
                <label className="font-semibold">Room Type</label>

                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                >
                  <option>Single</option>
                  <option>Double</option>
                  <option>Deluxe</option>
                  <option>Suite</option>
                </select>
              </div>

              {/* Price */}

              <div>
                <label className="font-semibold">Price</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              {/* Floor */}

              <div>
                <label className="font-semibold">Floor</label>

                <input
                  type="number"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              {/* Availability */}

              <div className="md:col-span-2">
                <label className="font-semibold">Availability</label>

                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                >
                  <option>Available</option>
                  <option>Occupied</option>
                  <option>Cleaning</option>
                  <option>Maintenance</option>
                </select>
              </div>

              {/* Description */}

              <div className="md:col-span-2">
                <label className="font-semibold">Description</label>

                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              {/* Amenities */}

              <div className="md:col-span-2">
                <label className="font-semibold block mb-3">Amenities</label>

                <div className="grid grid-cols-2 gap-3">
                  {amenitiesList.map((item) => {
                    const Icon = item.icon;

                    return (
                      <label
                        key={item.name}
                        className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          value={item.name}
                          checked={formData.amenities.includes(item.name)}
                          onChange={handleAmenities}
                        />

                        <Icon size={18} className="text-[#C8A96A]" />

                        <span>{item.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Current Image */}

              <div className="md:col-span-2">
                <label className="font-semibold block mb-3">
                  Current Image
                </label>

                <img
                  src={`http://localhost:5000/uploads/${selectedRoom?.image}`}
                  alt=""
                  className="w-48 h-32 object-cover rounded-lg border"
                />
              </div>

              {/* Upload New Image */}

              <div className="md:col-span-2">
                <label className="font-semibold block mb-3">
                  Upload New Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateRoom}
                className="px-6 py-3 rounded-lg bg-[#3fbb67] text-white hover:bg-[#255f18]"
              >
                Update Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/*=================== Delete Room Modal======================= */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[420px] shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-4 uppercase">
              Delete Room
            </h2>

            <p className="text-center text-gray-600 mb-8">
              Are you sure you want to delete
              <br />
              <span className="font-bold">Room {selectedRoom?.roomNumber}</span>
              ?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteRoom}
                className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= Creating Room Modal ================= */}

      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-center uppercase">
              Add New Room
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Room Number */}

              <div>
                <label className="font-semibold">Room Number</label>
                <input
                  type="number"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              {/* Room Type */}

              <div>
                <label className="font-semibold">Room Type</label>

                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                >
                  <option value="">Select Room Type</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>

              {/* Price */}

              <div>
                <label className="font-semibold">Price</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              {/* Floor */}

              <div>
                <label className="font-semibold">Floor</label>

                <input
                  type="number"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              {/* Availability */}

              <div className="md:col-span-2">
                <label className="font-semibold">Availability</label>

                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                >
                  <option>Available</option>
                  <option>Occupied</option>
                  <option>Cleaning</option>
                  <option>Maintenance</option>
                </select>
              </div>

              {/* Description */}

              <div className="md:col-span-2">
                <label className="font-semibold">Description</label>

                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              {/* Amenities */}

              <div className="md:col-span-2">
                <label className="font-semibold block mb-3">Amenities</label>

                <div className="grid grid-cols-2 gap-3">
                  {amenitiesList.map((item) => {
                    const Icon = item.icon;

                    return (
                      <label
                        key={item.name}
                        className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          value={item.name}
                          checked={formData.amenities.includes(item.name)}
                          onChange={handleAmenities}
                        />

                        <Icon size={18} className="text-[#051572]" />

                        <span>{item.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Upload New Image */}

              <div className="md:col-span-2">
                <label className="font-semibold block mb-3">
                  Upload New Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsAddOpen(false)}
                className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleAddRoom}
                className="px-6 py-3 rounded-lg bg-[#C8A96A] text-white hover:bg-[#523a0f]"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageRooms;
