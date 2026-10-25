const express=("express");
const Maintenance = require("../models/Maintenance");
const Room = require("../models/Room");
const User = require("../models/User");

// Create Maintenance
const createMaintenance = async (req, res) => {
    try {

        const {
            room,
            reportedBy,
            issue
        } = req.body;

        // Check Room
        const existingRoom = await Room.findById(room);

        if (!existingRoom) {
            return res.status(404).json({
                status: false,
                message: "Room Not Found"
            });
        }

        // Check User
        const existingUser = await User.findById(reportedBy);

        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: "User Not Found"
            });
        }

        // Create Maintenance Request
        const maintenance = await Maintenance.create({
            room,
            reportedBy,
            issue
        });

        // Change Room Availability
        existingRoom.availability = "Maintenance";
        await existingRoom.save();

        res.status(201).json({
            status: true,
            message: "Maintenance Request Created Successfully",
            maintenance
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

// Get All Maintenance
const getAllMaintenance = async (req, res) => {
    try {

        const maintenance = await Maintenance.find()
            .populate("room", "roomNumber roomType floor availability")
            .populate("reportedBy", "name email");

        res.status(200).json({
            status: true,
            message: "Maintenance Retrieved Successfully",
            totalMaintenance: maintenance.length,
            maintenance
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

// Get Single Maintenance
const getSingleMaintenance = async (req, res) => {
    try {

        const maintenance = await Maintenance.findById(req.params.id)
            .populate("room", "roomNumber roomType floor availability")
            .populate("reportedBy", "name email");

        if (!maintenance) {
            return res.status(404).json({
                status: false,
                message: "Maintenance Not Found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Maintenance Retrieved Successfully",
            maintenance
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

// Update Maintenance
const updateMaintenance = async (req, res) => {
    try {

        const maintenance = await Maintenance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!maintenance) {
            return res.status(404).json({
                status: false,
                message: "Maintenance Not Found"
            });
        }

        // If completed, make room available again
        if (maintenance.status === "Completed") {

            await Room.findByIdAndUpdate(
                maintenance.room,
                {
                    availability: "Available"
                }
            );

        }

        res.status(200).json({
            status: true,
            message: "Maintenance Updated Successfully",
            maintenance
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

// Delete Maintenance
const deleteMaintenance = async (req, res) => {
    try {

        const maintenance = await Maintenance.findByIdAndDelete(req.params.id);

        if (!maintenance) {
            return res.status(404).json({
                status: false,
                message: "Maintenance Not Found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Maintenance Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

module.exports = {
    createMaintenance,
    getAllMaintenance,
    getSingleMaintenance,
    updateMaintenance,
    deleteMaintenance
};