const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* Global error handler */
app.use((error, req, res, next) => {
    console.error("Global error handler:", error)
    
    const status = error.status || 500
    const message = error.message || "Internal server error"
    
    res.status(status).json({
        message,
        error: process.env.NODE_ENV === "development" ? error : {}
    })
})

module.exports = app