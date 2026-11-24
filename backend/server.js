const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectToMongoDB } = require("./config/db");

// Routes Imports (Yeh same rahenge)
const UserRoutes = require("./routes/UserRoutes");
const RoomRoutes = require("./routes/RoomRoutes");
const BookingRoutes = require("./routes/BookingRoutes");
const FeedbackRoutes = require("./routes/FeedbackRoutes");
const MaintenanceRoutes = require("./routes/MaintenanceRoutes");
const InvoiceRoutes = require("./routes/InvoiceRoutes");
const HotelServiceRoutes = require("./routes/HotelServiceRoutes");
const DashboardRoutes = require("./routes/DashboardRoutes");
const StaffRoutes = require("./routes/StaffRoutes");
const HousekeepingRoutes = require("./routes/HousekeepingRoutes");

const app = express();

dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.get("/", (_req, res) => {
  res.send("Hotel Management API Running");
});
app.use(async (_req, res, next) => {
  try {
    await connectToMongoDB();
    next();
  } catch (error) {
    console.error("MongoDB request connection failed:", error.message);
    res.status(503).json({ message: "Database is temporarily unavailable" });
  }
});

// Routes Setup
app.use("/api/users", UserRoutes);
app.use("/api/rooms", RoomRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/feedback", FeedbackRoutes);
app.use("/api/maintenance", MaintenanceRoutes);
app.use("/api/invoice", InvoiceRoutes);
app.use("/api/hotelservice", HotelServiceRoutes); // Space fix kiya yahan
app.use("/api/dashboard", DashboardRoutes);
app.use("/api/staff", StaffRoutes);
app.use("/api/housekeeping", HousekeepingRoutes);
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", database: "connected" });
});

const PORT = process.env.PORT || 5000;

// Vercel imports the Express app; local development starts the HTTP listener.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
