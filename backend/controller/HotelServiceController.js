const HotelService = require("../models/HotelService");

// ===================== Add Hotel Service =====================

const addHotelService = async (req, res) => {
  try {
    const { serviceName, description, price, icon, availability } = req.body;

    const existingService = await HotelService.findOne({ serviceName });

    if (existingService) {
      return res.status(400).json({
        status: false,
        message: "Service Already Exists",
      });
    }

    const service = await HotelService.create({
      serviceName,
      description,
      price,
      icon,
      availability,
    });

    res.status(201).json({
      status: true,
      message: "Service Added Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ===================== Get All Services =====================

const getAllHotelServices = async (req, res) => {
  try {
    const services = await HotelService.find();

    res.status(200).json({
      status: true,
      message: "Services Retrieved Successfully",
      totalServices: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ===================== Get Single Service =====================

const getSingleHotelService = async (req, res) => {
  try {
    const service = await HotelService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: false,
        message: "Service Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Service Retrieved Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ===================== Update Service =====================

const updateHotelService = async (req, res) => {
  try {
    const service = await HotelService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!service) {
      return res.status(404).json({
        status: false,
        message: "Service Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Service Updated Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ===================== Delete Service =====================

const deleteHotelService = async (req, res) => {
  try {
    const service = await HotelService.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: false,
        message: "Service Not Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Service Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addHotelService,
  getAllHotelServices,
  getSingleHotelService,
  updateHotelService,
  deleteHotelService,
};
