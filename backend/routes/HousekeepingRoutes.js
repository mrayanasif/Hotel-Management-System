const express = require("express");

const router = express.Router();

const {
    getCleaningRooms,
    markRoomClean
} = require("../controller/HousekeepingController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Get Cleaning Rooms
router.get(
    "/all-cleaning-rooms",
    authMiddleware,
    roleMiddleware("admin","housekeeping"),
    getCleaningRooms
);

// Mark Room Clean
router.put(
    "/mark-clean/:id",
    authMiddleware,
    roleMiddleware("admin","housekeeping"),
    markRoomClean
);

module.exports = router;