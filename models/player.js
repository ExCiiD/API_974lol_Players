import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        content: String,
        required: true,
    },
    role: {
        type: String,
        content: String,
        required: true,
    },
    rank: {
        type: String,
        content: String,
        required: true,
    }
});

export const Player = mongoose.model('Player', playerSchema);