const express = require("express");

const authRouter = express.Router();
const userController = require("../controllers/user.controller");
const authUserMiddleware = require("../middleware/auth.middleware");

/**
 * @route POST /api/auth/register
 * @description register new user
 * @access public
 */
authRouter.post("/register", userController.registerUser);

/**
 * @route POST /api/auth/login
 * @description login user with email and pasword
 * @access public
 */
authRouter.post("/login", userController.loginUser);

/**
 * @route GET /api/auth/logout
 * @description Remove token from cookie and add token in blacklist
 * @access public
 */
authRouter.get("/logout", userController.logoutUser);
/**
 * @route GET /api/auth/get-me
 * @description  details of user logged in
 * @access private
 */
authRouter.get("/get-me", authUserMiddleware.authUser, userController.getMe);

module.exports = authRouter;
