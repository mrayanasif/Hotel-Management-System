const Room =require("../models/Room");
// const mongoose = require("mongoose");

const addRoom = async (req,res)=>{
    try {
        const{
            roomNumber,
            roomType,
            price,
            floor,
            description,
            amenities
        }=req.body

        const existingRoom = await Room.findOne({roomNumber});

        if (existingRoom){
            return res.status(400).json({
                status:false,
                message:"Room Number Already Exist"
            });
        }
// Room Creation
const image = req.file ? req.file.filename : "";
        const room = await Room.create({
            roomNumber,
            roomType,
            floor,
            price,
            image,
            description,
            amenities
          

        });
        res.status(201).json({
            status: true,
            message:"Room Added Successfully",
            room
        });
    } catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
};
//  All Rooms GET
 
const getAllRooms = async (req,res) =>{
    try {
        
        const rooms = await Room.find();
        res.status(200).json({
            status: true,
            message:"Rooms Retrieved Successfully",
            totalRooms: rooms.length,
            rooms
        });
    } catch (error) {
        res.status(500).json({
            status : false,
            message: error.message 
        });
    }
};

// Single Room 

const getSingleRoom = async (req,res) =>{
    try {
        const room = await Room.findById(req.params.id);
        if (!room){
            return res.status(404).json({
                status: false,
                message:"Room Not Found"
            });


        }

        res.status(200).json({
            status:true,
            message:"Room Retrieved Successfully",
            room
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }

}

// Room UPDATE

const UpdateRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      roomType,
      price,
      floor,
      availability,
      description,
      amenities,
    } = req.body;

    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        status: false,
        message: "Room Not Found",
      });
    }

    room.roomNumber = roomNumber;
    room.roomType = roomType;
    room.price = price;
    room.floor = floor;
    room.availability = availability;
    room.description = description;
    room.amenities = amenities;

    // Update image only if a new image is uploaded
    if (req.file) {
      room.image = req.file.filename;
    }

    await room.save();

    res.status(200).json({
      status: true,
      message: "Room Updated Successfully",
      room,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// deletion of room 
const DeleteRoom = async (req,res) =>{
    try {
        const room = await Room.findByIdAndDelete(req.params.id);

       

        res.status(200).json({
            status:true,
            message:"Room Removed Successfully "
        })
    } catch (error) {
        return res.status(404).json({
            status:false,
            message:"Room Not Removed"
        });
    }
}


module.exports={
    addRoom, getAllRooms, getSingleRoom, UpdateRoom, DeleteRoom

};