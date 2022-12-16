import User from "../models/userRegister.js";
import Provider from '../models/providerRegister.js'
import express from 'express';
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const router = express.Router();

export const signinuser=async (req,res)=>{
    const {email,password}=req.body;

    try { 
        const existingUser=await User.findOne({email});
        
        if(!existingUser){
            return res.status(404).json({message:"User doesn't exist"});
        }

        const checkpass=await bcrypt.compare(password,existingUser.password);

        if(!checkpass){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token=jwt.sign({email: existingUser.email, id:existingUser._id},"test",{expiresIn:"1h"});

        res.status(200).json({result:existingUser,token});


    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }


}
export const signupuser=async (req,res)=>{
    const {email,password,firstName,lastName}=req.body;

    try { 
        const existingUser=await User.findOne({email});
        
        if(existingUser){
            return res.status(404).json({message:"User already exist"});
        }

        const hashedPassword= await bcrypt.hash(password,12);

        const result= await User.create({test:"",email,resources:[],password:hashedPassword,name:`${firstName} ${lastName}`});

        const token=jwt.sign({email, id:result._id},"test",{expiresIn:"1h"});

        res.status(200).json({result,token});


    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }


}

//primary
export const signinprovider=async (req,res)=>{
    const {email,password}=req.body;

    try { 
        const existingUser=await Provider.findOne({email});
        
        if(!existingUser){
            return res.status(404).json({message:"User doesn't exist"});
        }

        const checkpass=await bcrypt.compare(password,existingUser.password);

        if(!checkpass){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token=jwt.sign({email: existingUser.email, id:existingUser._id},"test",{expiresIn:"1h"});

        res.status(200).json({result:existingUser,token});


    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }


}
export const signupprovider=async (req,res)=>{
    const {email,password,brandName,cost,available_VM,network_bandwidth,security_management,
    flexibility,response_time}=req.body;

    try { 
        const existingUser=await Provider.findOne({email});
        
        if(existingUser){
            return res.status(404).json({message:"User already exist"});
        }

        const hashedPassword= await bcrypt.hash(password,12);

        const result= await Provider.create({email,total_VM:available_VM,password:hashedPassword,name:brandName,cost,available_VM,network_bandwidth,security_management,flexibility,response_time});

        const token=jwt.sign({email, id:result._id},"test",{expiresIn:"1h"});

        res.status(200).json({result,token});


    } catch (error) {
        res.status(500).json({error,message:"Something went wrong"})
    }


}

export const updateDetails=async(req,res)=>{
    
    const {id}=req.params;
    const {email,brandName,cost,available_VM,network_bandwidth,security_management,
        flexibility,response_time} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedData = { email,total_VM:available_VM,cost,name:brandName,network_bandwidth,security_management,flexibility,response_time, _id: id };

    await Provider.findByIdAndUpdate(id, updatedData, { new: true });

    res.json(updatedData);

   
    
}
export const ResourceUpdate=async(req,res)=>{
    
    const {id}=req.params;
    
    
    const {idx} = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
   /*  const providerData=await Provider.findById(proId); */
    /* const userData=await User.findById(id) */

    const pastInfo=await User.findById(id);
    const pastInfoProv=await Provider.findById(idx);
    const newResources=pastInfo.resources.concat([idx])
   /*  const providerUpdate=await Provider.findByIdAndUpdate(proId, {available_VM:providerData.available_VM - 1,sales:providerData.sales + providerData.cost}, { new: true }); */
    await User.findByIdAndUpdate(id,{test:"vydvukdjfbw",resources:newResources})  
    await Provider.findByIdAndUpdate(idx,{sales:pastInfoProv.sales+pastInfoProv.cost,available_VM:pastInfoProv.available_VM-1})  
   /*  console.log(userUpdate, providerUpdate); */
   console.log(newResources,idx);
    
    res.json(newResources);

   
    
}
export const getDetails=async(req,res)=>{
    try {
        const userInfo=await Provider.find();

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getUserDetails=async(req,res)=>{
    try {
        const userInfo=await User.find();

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
/* export const getPosts=async(req,res)=>{
    try {
        const userInfo=await UserRegister.find();

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
} */




/* export default router; */


