const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

/**
 * @name registerUserController
 * @description register a new user , expect username,email and password in the request body
 * @access Public
 */


async function registerUserController(req,res){
    const{username,email,password} = req.body

    if(!username|| !email || !password){
        return res.status(400).json({
            message: "please provide usename , email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username},{email}]
    })

    if (isUserAlreadyExists){
        //isUSerAlreadyExists.username == username
        return res.status(400).json({
            messagge:"Account already exists with this emailadress or username"
        })
    }

   const hash = await bcrypt.hash(password,10)

   const user = await userModel.create({

        username,
        email,
        password: hash
   })

   const token = jwt.sign(
    {id:user.id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
   )

   res.cookie("token", token)

   res.status(201).json({
    message: "User registers successfully",
    user:{
     
    id: user.id,
    username: user.username,
    email: user.email
    }
   })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public 
 * 
 */
async function loginUserController(req,res){
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password"
        })
    }

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password , user.password)
  
    if (!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password "
        })
    }
const token = jwt.sign(
    {id:user.id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
   )
   res.cookie("token",token)
   res.status(200).json({
    message:"user logged in successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email}
   })

}

/**
 * @name logoutUserController
 * @description logout a user, expects token in the request header
 * @access Public 
 * 
 */

async function logoutUserController(req,res){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out successfully"
    })
}
module.exports= {
    registerUserController,
    loginUserController,
    logoutUserController
}