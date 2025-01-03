import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'Change Group description...'
    },
    members: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Group = mongoose.model('Group', groupSchema);
export default Group;