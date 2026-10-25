const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createMaintenance,
    getAllMaintenance,
    getSingleMaintenance,
    updateMaintenance,
    deleteMaintenance
} = require("../controller/MaintenanceController");

// Create Maintenance
router.post(
    "/create",
    authMiddleware,
    createMaintenance
);

// Get All Maintenance
router.get(
    "/all-maintenance",
    authMiddleware,
    getAllMaintenance
);

// Get Single Maintenance
router.get(
    "/single-maintenance/:id",
    authMiddleware,
    getSingleMaintenance
);

// Update Maintenance
router.put(
    "/update/:id",
    authMiddleware,
    updateMaintenance
);

// Delete Maintenance
router.delete(
    "/delete/:id",
    authMiddleware,
    deleteMaintenance
);

module.exports = router;