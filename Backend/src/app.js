const express = require("express")
const cookieParser = require('cookie-parser')

const app = express()// server initiate krna , server ka instance create krna
//middlewares or routes create krna and use krna yeh app.js ka kaam hai

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//require all the routes here
const authRouter = require("./routes/auth.routes")


//using all the routes here
app.use("/api/auth", authRouter)

module.exports = app



