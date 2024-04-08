import express from "express";
import { config } from "dotenv";
import paymentRouter from "./routes/PaymentRoutes.js"
import createRoutes from "./routes/createRoutes.js"
import foundationRouter from "./routes/foundationRoutes.js"
import fetchRoutes from "./routes/fetchRoutes.js"
import cors from "cors";
import cookieParser from "cookie-parser";

config({path:"./config/config.env"})

export const app = express()

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api",paymentRouter)
app.use("/api",createRoutes)
app.use("/api",fetchRoutes)
app.use("/api/foundation",foundationRouter)

app.get("/api/getkey",(req,res)=>res.status(200).json({key:process.env.RAZORPAY_API_KEY}));
