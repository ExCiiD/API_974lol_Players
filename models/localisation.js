import mongoose from 'mongoose';

const localisationSchema = new mongoose.Schema({
    country: {
        type: String,
        content: String,
        required: true,
    },
    city: {
        type: String,
        content: String,
        required: true,
    }
});

export const Localisation = mongoose.model('Localisation', localisationSchema);