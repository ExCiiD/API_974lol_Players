import mongoose from 'mongoose';

const localisationSchema = new mongoose.Schema({
    Pays: {
        type: String,
        content: String,
        required: true,
    },
    Ville: {
        type: String,
        content: String,
    }
});

export const localisation = mongoose.model('Localisation', localisationSchema);