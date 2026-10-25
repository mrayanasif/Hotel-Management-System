
const Staff = require("../models/Staff");

// Create Staff
// Generate Employee ID


// Create Staff
const createStaff = async (req, res) => {
    try {

        const {
            name,
            email,
            contact,
            role,
            salary,
            address,
            joiningDate,
            status
        } = req.body;

        // Check Existing Staff
        const existingStaff = await Staff.findOne({ email });

        if (existingStaff) {
            return res.status(400).json({
                status: false,
                message: "Staff Already Exists"
            });
        }

        // Generate Employee ID
        const lastStaff = await Staff.findOne().sort({ createdAt: -1 });

        let employeeId = "EMP001";

        if (lastStaff && lastStaff.employeeId) {
            const number =
                parseInt(lastStaff.employeeId.replace("EMP", "")) + 1;

            employeeId = `EMP${number.toString().padStart(3, "0")}`;
        }

        // Create Staff
        
        const staff = await Staff.create({
            employeeId,
            name,
            email,
            contact,
            role,
            salary,
            address,
            joiningDate,
            status
        });

        res.status(201).json({
            status: true,
            message: "Staff Created Successfully",
            staff
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

// Get All Staff
const getAllStaff = async (req, res) => {
    try {

        const staff = await Staff.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            message: "Staff Retrieved Successfully",
            totalStaff: staff.length,
            staff
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

// Get Single Staff
const getSingleStaff = async (req, res) => {
    try {

        const staff = await Staff.findById(req.params.id);

        if (!staff) {
            return res.status(404).json({
                status: false,
                message: "Staff Not Found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Staff Retrieved Successfully",
            staff
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

// Update Staff
const updateStaff = async (req, res) => {
    try {

        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!staff) {
            return res.status(404).json({
                status: false,
                message: "Staff Not Found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Staff Updated Successfully",
            staff
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

// Delete Staff
const deleteStaff = async (req, res) => {
    try {

        const staff = await Staff.findByIdAndDelete(req.params.id);

        if (!staff) {
            return res.status(404).json({
                status: false,
                message: "Staff Not Found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Staff Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });

    }
};

module.exports = {
    createStaff,
    getAllStaff,
    getSingleStaff,
    updateStaff,
    deleteStaff
};