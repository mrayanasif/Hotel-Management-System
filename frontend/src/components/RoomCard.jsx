import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Star,
  Wifi,
  Tv,
  Coffee,
  BedDouble,
  UtensilsCrossed,
  ParkingCircleIcon,
  PhoneCallIcon,
} from "lucide-react";

function RoomCard({ room }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      {/* Room Image */}

      <div className="overflow-hidden">
        <img
         src={`http://localhost:5000/uploads/${room.image}`}
          alt={room.roomType}
          className="w-full h-100 object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Room Details */}

      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">{room.roomType} Room</h2>

          <span className="text-purple-900 font-semibold">
  Rs. {Number(room.price).toLocaleString("en-PK")}
</span>
        </div>

        <p className="text-gray-500 mb-3">Room No : {room.roomNumber}</p>

        <span
          className={`px-3 py-1 rounded-full  text-sm font-semibold ${
            room.availability === "Available"
              ? "bg-green-100 text-green-700"
              : room.availability === "Occupied"
                ? "bg-red-100 text-red-700"
                : room.availability === "Cleaning"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-700"
          }`}
        >
          {room.availability}
        </span>
        {/* Rating */}

        <div className="flex gap-1 mt-5 mb-4 text-amber-500">
          <Star fill="currentColor" size={18} />
          <Star fill="currentColor" size={18} />
          <Star fill="currentColor" size={18} />
          <Star fill="currentColor" size={18} />
          <Star fill="currentColor" size={18} />
        </div>

        {/* Description */}

        <p className="text-gray-600 leading-7 mb-6">{room.description}</p>

        {/* Amenities */}

        <div className="flex gap-5 text-purple-900 mb-6">
          <Wifi />
          <UtensilsCrossed />
          <Tv />
          <ParkingCircleIcon />
          <Coffee />
          <PhoneCallIcon />
          <BedDouble />
        </div>

        {/* Button */}

        <button
          disabled={room.availability !== "Available"}
          onClick={() =>
            navigate("/CreateBooking", {
              state: { room },
            })
          }
          className={`w-full py-3 rounded-xl transition ${
            room.availability === "Available"
              ? "bg-amber-600 hover:bg-amber-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {room.availability === "Available" ? "Book Now" : "Not Available"}
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
