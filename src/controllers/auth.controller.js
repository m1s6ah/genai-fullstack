const userModel = require("../models/user.model")


/**
 * @name registerUserController
 * @description register a new user , expect username,email and password in the request body
 * @access Public
 */


async function registerUSerController(req,res){
    const{username,email,password} = req.body

    if(!username|| !email || !password){
        return res.status(400).json({
            message: "please provide usename , email and password"
        })
    }

    const isUserAlreadyExosts = await userModel.findone({
        $or: [{username},{email}]
    })
}
module.exports= {
    registerUSerController
}