const express = require("express");

const router = express.Router();

const {
  addHotelService,
  getAllHotelServices,
  getSingleHotelService,
  updateHotelService,
  deleteHotelService,
} = require("../controller/HotelServiceController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ================= Get All Hotel Services =================

router.get(
  "/all-services", 
  getAllHotelServices
);

// ================= Get Single Hotel Service =================

router.get(
  "/:id", 
  getSingleHotelService
);

// ================= Add Hotel Service =================

router.post(
  "/add-service",
  authMiddleware,
  roleMiddleware("admin"),
  addHotelService,
);

// ================= Update Hotel Service =================

router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateHotelService,
);

// ================= Delete Hotel Service =================

router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteHotelService,
);

module.exports = router;
