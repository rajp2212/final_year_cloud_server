import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'

const app=express();
dotenv.config()

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/register',userRoutes);

app.get('/',(req,res)=>{
    res.send("App is running")
})
const CONNECTION_URL='mongodb+srv://rajwardhan:221201raj@cluster0.tmeta.mongodb.net/?retryWrites=true&w=majority'
const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})})
.catch((err)=>{console.log(err)})

/* mongoose.set("useFindAndModify", false); */