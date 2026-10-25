const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    // USER CREATION //

    /*this is there to check whether its email exist or not*/
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Account already exist with this email",
      });
    }
    let hashpass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      contact,
      password: hashpass,
    });

    res.status(201).json({
      status: true,
      message: "Account Created Successfully! Proceed Towards Login",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// LOGIN Credential //
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Not Found ",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "You Have Entered Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
    };

    res.status(200).json({
      status: true,
      message: "Login Successfully",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      status: true,
      message: "Users Retrieved Successfully",
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// USER UPDATE

const updateUser = async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        contact,
      },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      status: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//  USER DELETION
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: true,
      message: "User Removed Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Delete failed",
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
