import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
import { io } from '../lib/socket.js';
import { profile } from 'console';

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        if(password.length < 6) {
            return res.status(400).json({message: 'Password must be atleast 6 characters'});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: 'Email already exists'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
                bio: newUser.bio
            })
        } else {
            return res.status(400).json({message: 'Invalid User data'});
        }

    } catch (error) {
        console.log(`Error in signup controller: ${error.message}`);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            bio: user.bio
        })
    } catch (error) {
        console.log(`Error in login controller: ${error.message}`);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt_token', '', {maxAge: 0});
        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        console.log(`Error in logout controller: ${error.message}`);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePic, bio} = req.body;
        const userId = req.user._id;

        const updates = {};

        if(profilePic) {
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            updates.profilePic = uploadResponse.secure_url;
        }

        if(bio) updates.bio = bio;
        const updatedUser  = await User.findByIdAndUpdate(userId, updates, { new: true });

        io.emit('profileUpdated', updatedUser);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(`Error in updating profile: ${error.message}`);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        return res.status(200).json(user);
    } catch (error) {
        console.log(`Error in checkAuth controller: ${error.message}`);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}