import mongoose from "mongoose";

export const connectDB = async()=>{
    const {connection} = await mongoose.connect(process.env.MONGO_URL,{
        dbName:"Backend-SevaSetu"
    })

    console.log(`MongoDB is conneceteed ${connection.host}`)
}