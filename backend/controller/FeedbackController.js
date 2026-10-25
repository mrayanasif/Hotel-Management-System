const express = require("express");
const Feedback = require("../models/Feedback");
const User = require("../models/User");
const Booking = require("../models/Booking");

const createFeedback = async (req, res) => {
  try {
    const user = req.user._id;
    const { booking, rating, satisfied, recommend, comment } = req.body;

    // Check if user exists
    const existingUser = await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    // Check if booking exists
    const existingBooking = await Booking.findById(booking);

    if (!existingBooking) {
      return res.status(404).json({
        status: false,
        message: "Booking Not Found",
      });
    }

    // Check if feedback already exists
    const existingFeedback = await Feedback.findOne({
      user,
      booking,
    });

    if (existingFeedback) {
      return res.status(400).json({
        status: false,
        message: "Feedback Already Submitted",
      });
    }
    if (existingBooking.bookingStatus !== "Completed") {
      return res.status(400).json({
        status: false,
        message: "Feedback can only be submitted after checkout.",
      });
    }

    // Create feedback
    const feedback = await Feedback.create({
      user,
      booking,
      rating,
      comment,
      satisfied,
      recommend,
    });

    res.status(201).json({
      status: true,
      message: "Feedback Added Successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
const getSingleFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("user", "name email contact")
      .populate({
        path: "booking",
        populate: {
          path: "room",
          select: "roomNumber roomType",
        },
      });
    if (!feedback) {
      return res.status(404).json({
        status: false,
        message: "Feedback Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Feedback Retrieved Successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
// All feedbacks
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("user", "name email contact")
      .populate({
        path: "booking",
        populate: {
          path: "room",
          select: "roomNumber roomType",
        },
      });

    res.status(200).json({
      status: true,
      message: "Feedback Retrieved Successfully",
      totalFeedback: feedback.length,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Update Feedback
const UpdateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!feedback) {
      return res.status(404).json({
        status: false,
        message: "Feedback Not Found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Feedback Updated Successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//  delete Feedback
const DeleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        status: false,
        message: "Feedback Not Found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Feedback Removed Sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  UpdateFeedback,
  DeleteFeedback,
};
