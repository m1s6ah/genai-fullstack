const{Router}= require('express')
const authController = requre("../controllers/auth.controller")

const authRouter = Router()
/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access Public
  */

authRouter.post("/register", authController.registerUserController)


module.exports= authRouter