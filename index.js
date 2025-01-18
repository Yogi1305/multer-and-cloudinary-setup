import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import { upload } from "./multer.js";
import { uploadoncloudinar } from "./cloudinary.js";
dotenv.config();

const app =express();

const connectdb= async()=>{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
    
}
connectdb();


app.get("/",(req,res)=>{
    return res.send("i am working")
})
app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const result = await uploadoncloudinar(req.file.path);
        if (!result) {
            return res.status(500).json({ message: "Failed to upload to Cloudinary" });
        }

        res.status(200).json({ url: result.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(8000,()=>{
    console.log("server is listening");
    
})