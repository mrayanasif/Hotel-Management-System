const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    generateInvoice, getAllInvoices, getUserInvoices, getSingleInvoice, deleteInvoice} = require("../controller/InvoiceController");

// Get All Invoices
router.get(
  "/all-invoices",
  authMiddleware,
  roleMiddleware("admin"),
  getAllInvoices
);

// Get Single Invoice
router.get(
  "/single-invoice/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getSingleInvoice
);

// Get User Invoices
router.get(
  "/user/:guestId",
  authMiddleware,
  roleMiddleware("admin"),
  getUserInvoices
);

// Delete Invoice
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteInvoice
);
module.exports = router;