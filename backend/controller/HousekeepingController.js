const Room = require("../models/Room");

// Get All Cleaning Rooms
const getCleaningRooms = async (req, res) => {
    try {

        const rooms = await Room.find({
            availability: "Cleaning"
        }).sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            message: "Cleaning Rooms Retrieved Successfully",
            totalRooms: rooms.length,
            rooms
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

// Mark Room Clean
const markRoomClean = async (req, res) => {
    try {

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                status: false,
                message: "Room Not Found"
            });
        }

        room.availability = "Available";

        await room.save();

        res.status(200).json({
            status: true,
            message: "Room Marked Available Successfully",
            room
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

module.exports = {
    getCleaningRooms,
    markRoomClean
};