const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
    {
         
        employeeId: {
            type: String,
            unique: true,
            required: true,
        },
        
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        contact: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: [
                "Manager",
                "Receptionist",
                "Housekeeping",
                "Maintenance",
                "Chef",
                "Security"
            ],
            required: true
        },

        salary: {
            type: Number,
            required: true
        },

        address: {
            type: String,
            default: ""
        },

        joiningDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["Active", "Inactive", "OnLeave"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Staff", StaffSchema);