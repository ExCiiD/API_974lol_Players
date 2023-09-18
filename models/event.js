import mongoose from 'mongoose';
import { Team } from './team.js';

const eventSchema = new mongoose.Schema({
    eventCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Team,
        required: true,
    },
    eventName: {
        type: String,
        content: String,
        required: true,
    },
    eventLocalisation: {
        type: String, /* id de localisation */
        content: String,
        //ajouter un option online / offline(lan) et si offline, donner la localisation
    },
    participants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Team, 
    },
    eventDate: {
        Date,
    }
});

export const Event = mongoose.model('Event', eventSchema);