const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HotelService",
      },
    ],

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    roomPrice: {
      type: Number,
      required: true,
    },

    servicePrice: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
