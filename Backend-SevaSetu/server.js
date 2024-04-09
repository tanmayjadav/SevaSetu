import {app} from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";

connectDB();
console.log(`${process.env.FRONTEND_URL} - frontend-url`)
console.log(`${process.env.BACKEND_URL} - backend-url`)

export const instance = new Razorpay({
    key_id : process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

app.listen(process.env.PORT,()=>{
    console.log(`server is working on ${process.env.PORT}`)
})
