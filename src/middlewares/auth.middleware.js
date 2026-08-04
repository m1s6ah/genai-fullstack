const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    const token = req.cookies.token // reading the token from the cookie

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        })
    }
    
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token }) 
    
     if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is blacklisted. Please login again."
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)// ask for two things, first the token and second the secret key to verify the token
        ///now if the token is valid, we will get the decoded payload which contains the user information
        ///but if the token is invalid, it will throw an error and we will catch it in the catch block
        req.user = decoded // we will attach the decoded payload to the request object so that we can access it in the next middleware or route handler
        //and then we will call the next() function to pass the control to the next middleware or route handler
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = { authUser }