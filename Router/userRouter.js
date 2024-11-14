const express = require("express");
const user = require("../Controller/userController");

const router = express.Router();

router.route("/register").post(user.addUserController);
router.route("/login").post(user.loginUserController);

module.exports = { router };
