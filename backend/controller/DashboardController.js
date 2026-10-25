const User = require("../models/User");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const Feedback = require("../models/Feedback");
const HotelService = require("../models/HotelService");
const Invoice = require("../models/Invoice");
const Maintenance = require("../models/Maintenance");
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalRooms = await Room.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const totalFeedback = await Feedback.countDocuments();

    const totalServices = await HotelService.countDocuments();

    const totalMaintenance = await Maintenance.countDocuments();
    const availableRooms = await Room.countDocuments({
      availability: "Available",
    });

    const bookedRooms = await Room.countDocuments({
      availability: "Booked",
    });
const invoices = await Invoice.find({
  status: "Paid",
});

const revenueData = [
  { month: "Jan", income: 0 },
  { month: "Feb", income: 0 },
  { month: "Mar", income: 0 },
  { month: "Apr", income: 0 },
  { month: "May", income: 0 },
  { month: "Jun", income: 0 },
  { month: "Jul", income: 0 },
  { month: "Aug", income: 0 },
  { month: "Sep", income: 0 },
  { month: "Oct", income: 0 },
  { month: "Nov", income: 0 },
  { month: "Dec", income: 0 },
];

invoices.forEach((invoice) => {
  const month = new Date(invoice.paymentDate).getMonth();

  revenueData[month].income += invoice.amount;
});
    res.status(200).json({
      status: true,

      totalUsers,
      totalRooms,
      totalBookings,

      totalFeedback,
      totalServices,
      totalMaintenance,

      availableRooms,
      bookedRooms,
      revenueData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
// user displaying with tables 


const getRecentBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("room", "roomNumber roomType price")
      .sort({ createdAt: -1 })
      .limit(5);

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
  getDashboardStats,getRecentBookings
};
