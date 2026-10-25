const express = require("express");

const router = express.Router();

const {
    registerUser,loginUser, getAllUsers, updateUser, deleteUser
    } = require("../controller/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser)

router.get(
    "/all-users",
    authMiddleware,
    roleMiddleware("admin"),
    getAllUsers

);

router.put(
    "/update/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateUser
);
router.delete(
    "/delete/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteUser
);
module.exports = router;