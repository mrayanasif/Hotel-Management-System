const express = require("express");
const {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  UpdateFeedback,
  DeleteFeedback,
} = require("../controller/FeedbackController");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createFeedback);

router.get("/single-feedback/:id", authMiddleware, getSingleFeedback);

router.get("/all-feedback", authMiddleware, getAllFeedback);

router.put("/update/:id", authMiddleware, UpdateFeedback);

router.delete("/delete/:id", authMiddleware, DeleteFeedback);

module.exports = router;
