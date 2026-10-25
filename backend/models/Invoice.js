const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card", "Online"],
    required: true,
  },
  status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
  items: [
    {
      description: String,
      amount: Number,
    },
  ],
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
