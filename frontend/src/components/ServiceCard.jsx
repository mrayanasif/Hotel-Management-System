import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sparkles,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Waves,
  Bell,
  Gamepad2,
  Gamepad,
} from "lucide-react";

// Icon Helper
const icons = {
  Sparkles,
  Car,
  UtensilsCrossed,
  Dumbbell,
Gamepad2,
  Waves,
  Bell,
};

function ServiceCard({ service }) {
   const navigate = useNavigate();
  // Select the correct icon
  const Icon = icons[service.icon];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      {/* Icon */}

      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
        {Icon && <Icon size={40} className="text-amber-600" />}
      </div>

      {/* Service Name */}

      <h2 className="text-2xl font-bold text-center mb-3">
        {service.serviceName}
      </h2>

      {/* Description */}

      <p className="text-gray-600 text-center leading-7 mb-6">
        {service.description}
      </p>

      {/* Price */}

      <p className="text-center text-amber-600 text-xl font-bold mb-6">
         Rs. {Number(service.price).toLocaleString("en-PK")}

      </p>

      {/* Availability */}

      <div className="flex justify-center mb-6">
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            service.availability === "Available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {service.availability}
        </span>
      </div>

      {/* Button */}

     <button
  onClick={() =>
    navigate("/CreateBooking", {
      state: {
        service,
      },
    })
  }
  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl transition duration-300"
>
  Book Service
</button>

    </div>
  );
}

export default ServiceCard;