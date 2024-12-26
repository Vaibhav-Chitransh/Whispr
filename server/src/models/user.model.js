import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        fullName: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: ''
        },
        bio: {
            type: String,
            default: 'Available'
        }
    },
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;