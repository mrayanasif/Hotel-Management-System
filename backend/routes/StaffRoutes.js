const express = require("express");

const router = express.Router();

const {
    createStaff,
    getAllStaff,
    getSingleStaff,
    updateStaff,
    deleteStaff
} = require("../controller/StaffController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Staff
router.post(
    "/create-staff",
    authMiddleware,
    roleMiddleware("admin"),
    createStaff
);

// Get All Staff
router.get(
    "/all-staff",
    authMiddleware,
    roleMiddleware("admin"),
    getAllStaff
);

// Get Single Staff
router.get(
    "/single-staff/:id",
    authMiddleware,
    roleMiddleware("admin"),
    getSingleStaff
);

// Update Staff
router.put(
    "/update-staff/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateStaff
);

// Delete Staff
router.delete(
    "/delete-staff/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteStaff
);

module.exports = router;