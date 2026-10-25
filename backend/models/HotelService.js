const mongoose = require("mongoose");

const hotelServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    availability: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HotelService", hotelServiceSchema);
