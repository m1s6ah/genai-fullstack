const{Router}= require('express')
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access Public
  */

authRouter.post("/register", authController.registerUserController)



/**
 * @route POSt /api/auth/login
 * @description login user with email and password
 * @access Public 
 * 
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description logout user and blacklist the token
 * @access Public 
 * 
 */
authRouter.get("/logout", authController.logoutUserController )


/***
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)



module.exports= authRouter