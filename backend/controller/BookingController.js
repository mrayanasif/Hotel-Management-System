const Booking = require("../models/Booking");
const Room = require("../models/Room");
const User = require("../models/User");
const Invoice = require("../models/Invoice");
const HotelService = require("../models/HotelService");

const createBooking = async (req, res) => {
  try {
    // Get data from request body
    const user = req.user._id;

    const { room, services, checkIn, checkOut } = req.body;
    // Check if user exists
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    // Check if room exists

    const existingRoom = await Room.findById(room);

    if (!existingRoom) {
      return res.status(404).json({
        status: false,
        message: "Room Not Found",
      });
    }

    // Check room availability
    if (existingRoom.availability !== "Available") {
      return res.status(400).json({
        status: false,
        message: "Room Not Available",
      });
    }

    // Calculate total days
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const difference = checkOutDate - checkInDate;
    const totalDays = difference / (1000 * 60 * 60 * 24);

    // Validate dates
    if (totalDays <= 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Check-In or Check-Out Date",
      });
    }

    // Room Price
    const roomPrice = totalDays * existingRoom.price;

    // Service Price
    let servicePrice = 0;

    if (services && services.length > 0) {
      const selectedServices = await HotelService.find({
        _id: { $in: services },
      });

      servicePrice = selectedServices.reduce(
        (total, service) => total + service.price,
        0,
      );
    }

    // Grand Total
    const totalPrice = roomPrice + servicePrice;

    // Create booking
    const booking = await Booking.create({
      user,
      room,
      services,
      checkIn,
      checkOut,
      servicePrice,
      roomPrice,
      totalPrice,
    });

    // Update room status
    existingRoom.availability = "Occupied";
    await existingRoom.save();

    // Success response
    res.status(201).json({
      status: true,
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Admin Update booking
const adminUpdateBooking = async (req, res) => {
  try {
    const { user, room, services, checkIn, checkOut, bookingStatus } = req.body;

    // Find Booking
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booking Not Found",
      });
    }

    // Check User
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    // Check Room
    const existingRoom = await Room.findById(room);

    if (!existingRoom) {
      return res.status(404).json({
        status: false,
        message: "Room Not Found",
      });
    }

    // Validate Dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const totalDays = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    if (totalDays <= 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Check-In or Check-Out Date",
      });
    }

    // Room Price
    const roomPrice = existingRoom.price * totalDays;

    // Service Price
    let servicePrice = 0;

    if (services && services.length > 0) {
      const selectedServices = await HotelService.find({
        _id: { $in: services },
      });

      servicePrice = selectedServices.reduce(
        (total, service) => total + service.price,
        0,
      );
    }

    // Total Price
    const totalPrice = roomPrice + servicePrice;

    // Update Booking
    booking.user = user;
    booking.room = room;
    booking.services = services;

    booking.checkIn = checkIn;
    booking.checkOut = checkOut;

    booking.bookingStatus = bookingStatus;

    booking.roomPrice = roomPrice;
    booking.servicePrice = servicePrice;
    booking.totalPrice = totalPrice;

    await booking.save();

    // Generate Invoice when booking is completed
    if (booking.bookingStatus === "Completed") {
      // Change room availability
      await Room.findByIdAndUpdate(booking.room, {
        availability: "Cleaning",
      });

      // Check if invoice already exists
      const existingInvoice = await Invoice.findOne({
        booking: booking._id,
      });

      if (!existingInvoice) {
        const populatedBooking = await Booking.findById(booking._id)
          .populate("user", "name email contact")
          .populate("room", "roomNumber roomType")
          .populate("services", "serviceName price");

        const items = [
          {
            description: `Room ${populatedBooking.room.roomNumber} (${populatedBooking.room.roomType})`,
            amount: populatedBooking.roomPrice,
          },

          ...populatedBooking.services.map((service) => ({
            description: service.serviceName,
            amount: service.price,
          })),
        ];

        await Invoice.create({
          booking: populatedBooking._id,
          guest: populatedBooking.user._id,
          amount: populatedBooking.totalPrice,
          paymentMethod: "Cash",
          status: "Paid",
          items,
        });
      }
    }

    const updatedBooking = await Booking.findById(booking._id)
      .populate("user")
      .populate("room")
      .populate("services");

    res.status(200).json({
      status: true,
      message: "Booking Updated Successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
// Admin Create Booking
const adminCreateBooking = async (req, res) => {
  try {
    const { user, room, services, checkIn, checkOut } = req.body;

    // Check User
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    // Check Room
    const existingRoom = await Room.findById(room);

    if (!existingRoom) {
      return res.status(404).json({
        status: false,
        message: "Room Not Found",
      });
    }

    // Check Room Availability
    if (existingRoom.availability !== "Available") {
      return res.status(400).json({
        status: false,
        message: "Room is not available",
      });
    }

    // Validate Dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const totalDays = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    if (totalDays <= 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Check-In or Check-Out Date",
      });
    }

    // Room Price
    const roomPrice = existingRoom.price * totalDays;

    // Service Price
    let servicePrice = 0;

    if (services && services.length > 0) {
      const selectedServices = await HotelService.find({
        _id: { $in: services },
      });

      servicePrice = selectedServices.reduce(
        (total, service) => total + service.price,
        0,
      );
    }

    // Total Price
    const totalPrice = roomPrice + servicePrice;

    // Create Booking
    const booking = await Booking.create({
      user,
      room,
      services,
      checkIn,
      checkOut,
      roomPrice,
      servicePrice,
      totalPrice,
      bookingStatus: "Pending",
    });

    // Make Room Unavailable
    existingRoom.availability = "Available";
    await existingRoom.save();

    const createdBooking = await Booking.findById(booking._id)
      .populate("user")
      .populate("room")
      .populate("services");

    res.status(201).json({
      status: true,
      message: "Booking Created Successfully",
      booking: createdBooking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
// All Booking

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email contact")
      .populate("room", "roomNumber roomType price availability")
      .populate("services", "serviceName description price avalability");
    res.status(200).json({
      status: true,
      message: "Bookings Retrieved Successfully",
      totalBookings: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
// Single Booking
const getSingleBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email contact")
      .populate("room", "roomNumber roomType floor price availability")
      .populate("services", "serviceName description price avalability");

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booking Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Booking Retrieved Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Updating Booking

const updateBooking = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.body;

    // Find booking
    const booking = await Booking.findById(req.params.id).populate("room");

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booking Not Found",
      });
    }

    // Only booking owner can update
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized",
      });
    }

    // Only pending bookings can be updated
    if (booking.bookingStatus !== "Pending") {
      return res.status(400).json({
        status: false,
        message: "Only Pending Bookings Can Be Updated",
      });
    }

    // Calculate total days
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const difference = checkOutDate - checkInDate;
    const totalDays = difference / (1000 * 60 * 60 * 24);

    if (totalDays <= 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Check-In or Check-Out Date",
      });
    }

    // Recalculate prices
    const roomPrice = totalDays * booking.room.price;
    const totalPrice = roomPrice + booking.servicePrice;

    // Update booking
    booking.checkIn = checkIn;
    booking.checkOut = checkOut;
    booking.roomPrice = roomPrice;
    booking.totalPrice = totalPrice;

    await booking.save();

    res.status(200).json({
      status: true,
      message: "Booking Updated Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    // Find booking
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booking Not Found",
      });
    }

    // Check if booking belongs to logged-in user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        status: false,
        message: "Unauthorized",
      });
    }

    // Only Pending bookings can be cancelled
    if (booking.bookingStatus !== "Pending") {
      return res.status(400).json({
        status: false,
        message: "Only Pending Bookings Can Be Cancelled",
      });
    }

    // Change booking status
    booking.bookingStatus = "Cancelled";
    await booking.save();

    // Make room available again
    await Room.findByIdAndUpdate(booking.room, {
      availability: "Available",
    });

    res.status(200).json({
      status: true,
      message: "Booking Cancelled Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// deletebooking
const deletebooking = async (req, res) => {
  try {
    // 1. Find and delete the booking
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booking Not Found",
      });
    }

    await Room.findByIdAndUpdate(booking.room, { availability: "Cleaning" });

    res.status(200).json({
      status: true,
      message: "Booking Deleted ",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// user should see their own booking
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("room", "roomNumber roomType floor price availability image")

      .populate("services", "serviceName description price availability icon");

    res.status(200).json({
      status: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  adminCreateBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  cancelBooking,
  deletebooking,
  getMyBookings,
  adminUpdateBooking,
  // checkoutBooking,
};
