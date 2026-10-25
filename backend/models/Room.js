const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    roomType: {
      type: String,
      enum: ["Single", "Double", "Deluxe", "Suite"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    floor: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    availability: {
      type: String,
      enum: ["Available", "Occupied", "Cleaning", "Maintenance"],
      default: "Available",
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Room", roomSchema);
