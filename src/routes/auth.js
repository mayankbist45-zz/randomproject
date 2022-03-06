const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const Joi = require("joi");

const validate = require("../middlewares/validate.middleware");

const loginPasswordSchema = Joi.object().keys({
  emailId: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
});

// Create routes for user here
router.post("/", validate(loginPasswordSchema), AuthController.login);

module.exports = router;
