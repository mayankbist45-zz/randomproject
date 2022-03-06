const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// Create routes for user here
router.post("/signUp", UserController.register);

module.exports = router;
