import {Request , Response} from 'express';
import User from '../models/User';
import {hashPassword , comparePassword} from '../utils/hashUtils'
import {generateToken} from '../utils/tokenUtils'

export const signUp = async(req:Request , res:Response) => {
    const {name , email , password , confirmPassword} = req.body;
    console.log(req.body);
    if(password !== confirmPassword) {
        res.status(400).json({message : "Passwords do not match"});
        return; // Just return without a value
    }
    const existingUser = await User.findOne({email});
    if(existingUser) {
        res.status(400).json({message : "Email already exists"});
        return;
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({name , email , password : hashedPassword});
    const token = generateToken(user._id.toString());
    res.status(201).json({token, userId:user._id});
}

export const login = async(req:Request , res:Response) => {
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        res.status(404).json({message : "User not found"});
        return;
    }
    const isMatch = await comparePassword(password , user.password);
    if(!isMatch) {
        res.status(400).json({message:"Invalid Credentials"});
        return;
    }
    const token = generateToken(user._id.toString());
    res.json({token, userId: user._id});
}

export const forgotPassword = async(req:Request , res:Response) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        res.status(404).json({message:"User not found"});
        return;
    }
    // Generate and save reset token (simplified)
    const resetToken = generateToken(user._id.toString());
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();
    res.json({message:"Password reset link has been sent!" , resetToken});
}