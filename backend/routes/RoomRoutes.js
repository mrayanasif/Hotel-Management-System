const express = require("express");

const router = express.Router();

const { addRoom, getAllRooms, getSingleRoom, UpdateRoom, DeleteRoom } = require("../controller/RoomController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// To get Saaray users
router.get(
    "/all-rooms",
   getAllRooms
);
// to get single room
router.get(
    "/:id",
    getSingleRoom
);

// Creating A room
router.post(
    "/add-room",
    authMiddleware,
    roleMiddleware("admin"),
     upload.single("image"),
    addRoom
)

// update room
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  UpdateRoom
);
// room deletion
router.delete(
    "/delete/:id",
    authMiddleware,
    roleMiddleware("admin"),
    DeleteRoom
)
module.exports = router;