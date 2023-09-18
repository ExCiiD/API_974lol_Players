import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventCreator: {
        type: String,/* id de team */
        content: String,
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
    Participants: {
        type: String,
        content: String,
    },
    eventDate: {
        /* date de l'evenement */
    }
});

export const event = mongoose.model('Event', eventSchema);