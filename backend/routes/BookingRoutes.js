const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  adminCreateBooking,
  getSingleBooking,
  updateBooking,
  adminUpdateBooking,
  cancelBooking,
  deletebooking,
  getMyBookings,
} = require("../controller/BookingController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
// Create A Booking
router.post("/create-booking", authMiddleware, createBooking);
// Admin Create Booking
router.post(
  "/admin-create-booking",
  authMiddleware,
  roleMiddleware("admin"),
  adminCreateBooking,
);

// All Booking
router.get("/all-bookings", authMiddleware, getAllBookings);

// single booking
router.get("/single-booking/:id", authMiddleware, getSingleBooking);
// personal booking
router.get("/my-bookings", authMiddleware, getMyBookings);
// update booking
router.put("/update/:id", authMiddleware, updateBooking);
// admin access
router.put(
  "/admin-update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  adminUpdateBooking,
);
// Booking Cancel
router.put("/cancel/:id", authMiddleware, cancelBooking);
// Booking delete
router.delete("/delete/:id", authMiddleware, deletebooking);

// checkout
// router.put(
//     "/checkout/:id",
//     authMiddleware,
//     checkoutBooking
// )

module.exports = router;
