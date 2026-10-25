const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getRecentBookings,
} = require("../controller/DashboardController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardStats,
);

router.get(
  "/recent-bookings",
  authMiddleware,
  roleMiddleware("admin"),
  getRecentBookings,
);

module.exports = router;
