import mongoose from 'mongoose';

const localisationSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    codePostal: {
        type: String,
        required: true,
    }
});

export const Localisation = mongoose.model('Localisation', localisationSchema);