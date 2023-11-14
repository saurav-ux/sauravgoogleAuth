import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
// const connect = process.env.MONGO_URI
const connect = "mongodb+srv://sauravanand243:j5H27i7U3aJUzadq@cluster0.wa7qkxa.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(connect,{}).then(()=>{
    console.log("Connected to mongodb");
}).catch((error)=>{
    console.error("Connection Failed b/c: ",error);
})

