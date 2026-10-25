const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 👈 1. Import change kiya (connectDB nahi, ab connectToMongoDB aur disconnectFromMongoDB aayega)
const { connectToMongoDB, disconnectFromMongoDB } = require("./config/db");

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

// 👈 2. dotenv sabse pehle load hona chahiye
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

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

app.get("/", (req, res) => {
  res.send("Hotel Management API Running");
});

const PORT = process.env.PORT || 5000;

// 👈 3. Database connect hone ke BAAD hi server start karein
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

// 👈 4. Graceful Shutdown (Jab aap server band karein toh DB connection properly close ho)
process.on("SIGINT", async () => {
  await disconnectFromMongoDB();
  process.exit(0);
});