import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminRoute from "../routes/AdminRoutes";

// ================= Website =================

import Home from "../pages/Home";
import About from "../pages/About";
import Rooms from "../pages/Rooms";
import Bookings from "../pages/Bookings";
import CreateBooking from "../pages/CreateBooking";
import Services from "../pages/Services";
import Feedback from "../pages/Feedback";
import Login from "../pages/Login";
import Register from "../pages/Register";

import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";

// ================= Admin Dashboard =================

import AdminDashboard from "../dashboard/AdminDashboard";
import Users from "../dashboard/Users";
import ManageRooms from "../dashboard/ManageRooms";
import ManageBookings from "../dashboard/ManageBookings";
import ManageFeedback from "../dashboard/ManageFeedback";
import ManageServices from "../dashboard/ManageServices";
import ManageMaintenance from "../dashboard/ManageMaintenance";
import Invoice from "../dashboard/Invoice";
import Staff from "../dashboard/Staff";

// ================= Housekeeping =================

import ManageHousekeeping from "../dashboard/ManageHousekeeping";


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================================================= */}
        {/* WEBSITE */}
        {/* ================================================= */}

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/rooms"
            element={<Rooms />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          {/* Bookings */}

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />

          {/* Create Booking */}

          <Route
            path="/createbooking"
            element={
              <ProtectedRoute>
                <CreateBooking />
              </ProtectedRoute>
            }
          />

          {/* Feedback */}

          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />

        </Route>


        {/* ================================================= */}
        {/* AUTHENTICATION */}
        {/* ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================================================= */}
        {/* ADMIN PANEL */}
        {/* ================================================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute role="admin">
              <DashboardLayout />
            </AdminRoute>
          }
        >

          {/* Admin Dashboard */}

          <Route
            index
            element={<AdminDashboard />}
          />

          {/* Users */}

          <Route
            path="users"
            element={<Users />}
          />

          {/* Rooms */}

          <Route
            path="rooms"
            element={<ManageRooms />}
          />

          {/* Bookings */}

          <Route
            path="bookings"
            element={<ManageBookings />}
          />

          {/* Feedback */}

          <Route
            path="feedback"
            element={<ManageFeedback />}
          />

          {/* Services */}

          <Route
            path="services"
            element={<ManageServices />}
          />

          {/* Maintenance */}

          <Route
            path="maintenance"
            element={<ManageMaintenance />}
          />

          {/* Invoice */}

          <Route
            path="invoice"
            element={<Invoice />}
          />

          {/* Staff */}

          <Route
            path="staff"
            element={<Staff />}
          />

        </Route>


        {/* ================================================= */}
        {/* HOUSEKEEPING PANEL */}
        {/* ================================================= */}

        <Route
          path="/housekeeping"
          element={
            <AdminRoute role="housekeeping">
              <DashboardLayout />
            </AdminRoute>
          }
        >

          <Route
            index
            element={<ManageHousekeeping />}
          />

        </Route>


        {/* ================================================= */}
        {/* 404 */}
        {/* ================================================= */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-4xl font-bold">
                404 - Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;