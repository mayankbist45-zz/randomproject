const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const Joi = require("joi");

const isAuth = require("../middlewares/auth.middleware").auth;
const validate = require("../middlewares/validate.middleware");

const loginPasswordSchema = Joi.object().keys({
  emailId: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
});

// Create routes for user here
router.post("login", validate(loginPasswordSchema), AuthController.login);

route.post(
  "/loginByEmailPassword",
  validate(loginPasswordSchema),
  authCtrl.loginByEmailPassword
);

route.post("/signUpEmailPassword", authCtrl.signUpEmailPassword);
route.post("/forgetPassword", authCtrl.forgetPassword);
route.post("/resetPassword", authCtrl.resetPassword);

module.exports = router;