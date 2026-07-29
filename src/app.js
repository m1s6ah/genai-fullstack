const express = require("express")

const app = express()// server initiate krna , server ka instance create krna
//middlewares or routes create krna and use krna yeh app.js ka kaam hai


//require all the routes here
const authRouter = require("./routes/auth.routes")


//using all the routes here
app.use("/api/auth", authRouter)

module.exports = app



