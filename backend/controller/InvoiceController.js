const Booking = require("../models/Booking");
const Invoice = require("../models/Invoice");
// ===================== Generate Invoice =====================

const generateInvoice = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id)

      .populate("user", "name email contact")

      .populate("room", "roomNumber roomType price")

      .populate(
        "services",
        "serviceName description price"
      );

    if (!booking) {
      return res.status(404).json({
        status: false,
        message: "Booking Not Found",
      });
    }

    res.status(200).json({

      status: true,

      message: "Invoice Generated Successfully",

      invoice: {

  guest: booking.user,

  room: booking.room,

  checkIn: booking.checkIn,

  checkOut: booking.checkOut,

  roomCharges: booking.roomPrice,

  services: booking.services,

  serviceCharges: booking.servicePrice,

  grandTotal: booking.totalPrice,

  items: [

    {
      description: `Room ${booking.room.roomNumber} (${booking.room.roomType})`,
      amount: booking.roomPrice,
    },

    ...booking.services.map((service) => ({
      description: service.serviceName,
      amount: service.price,
    })),

  ],

},
    });

  } catch (error) {

    res.status(500).json({
      status: false,
      message: error.message,
    });

  }
};

const getAllInvoices = async (req, res) => {
  try {

    const invoices = await Invoice.find()
      .populate("guest", "name email contact")
      .populate({
        path: "booking",
        populate: [
          {
            path: "room",
            select: "roomNumber roomType",
          },
          {
            path: "services",
            select: "serviceName price",
          },
        ],
      });

    res.status(200).json({
      status: true,
      message: "Invoices Retrieved Successfully",
      totalInvoices: invoices.length,
      invoices,
    });

  } catch (error) {

    res.status(500).json({
      status: false,
      message: error.message,
    });

  }
};

const getUserInvoices = async (req, res) => {

  try {

    const invoices = await Invoice.find({
      guest: req.params.guestId,
    })

      .populate("guest", "name email")

      .populate({
        path: "booking",
        populate: {
          path: "room",
          select: "roomNumber roomType",
        },
      });

    res.status(200).json({

      status: true,

      totalInvoices: invoices.length,

      invoices,

    });

  } catch (error) {

    res.status(500).json({
      status: false,
      message: error.message,
    });

  }

};

const getSingleInvoice = async (req, res) => {
  try {

    const invoice = await Invoice.findById(req.params.id)
      .populate("guest", "name email contact")
      .populate({
        path: "booking",
        populate: [
          {
            path: "room",
            select: "roomNumber roomType",
          },
          {
            path: "services",
            select: "serviceName price",
          },
        ],
      });

    if (!invoice) {
      return res.status(404).json({
        status: false,
        message: "Invoice Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Invoice Retrieved Successfully",
      invoice,
    });

  } catch (error) {

    res.status(500).json({
      status: false,
      message: error.message,
    });

  }
};

const deleteInvoice = async (req, res) => {
  try {

    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        status: false,
        message: "Invoice Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Invoice Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      status: false,
      message: error.message,
    });

  }
};
module.exports = {
  generateInvoice,getAllInvoices,getUserInvoices,getSingleInvoice,deleteInvoice,
};