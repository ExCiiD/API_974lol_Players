import mongoose from 'mongoose';
import { Team } from './team.js';
import { Localisation } from './localisation.js';

//creation de l'entité 
const eventSchema = new mongoose.Schema({
    eventCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Team,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    //ajouter un option "type d'evenement" online / offline(lan) et si offline, donner la localisation
    eventType: {
        type: [String],
        enum: ['online', 'offline'],
        required: true,
    },
    eventLocalisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Localisation
    },
    participants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Team, 
    },
    eventDate: {
        Date,
    }
});

//MIDDLEWARES///////////////////////////////////////////////
//middleware qui s'exécute avant (.pre) qu'une requête de recherche (find)(voir controllers , fonction "getEvents") s'execute afin de ne remplir que le "teamName" dans le event creator au lieu de l'objectIf donné 
eventSchema.pre('find', function (next) {
    this.populate('eventCreator', 'teamName');
    next();
    //https://mongoosejs.com/docs/middleware.html
});
//middleware s'execute afin de donner l'objet complet delivré par l'objectIf donné 
eventSchema.pre('find', function (next) {
    this.populate('eventLocalisation');
    next();
    //https://mongoosejs.com/docs/middleware.html
});
//middleware s'execute afin de donner l'objet complet delivré par l'objectIf donné 
eventSchema.pre('find', function (next) {
    this.populate('eventLocalisation');
    next();
    //https://mongoosejs.com/docs/middleware.html
});
//MIDDLEWARES///////////////////////////////////////////////


export const Event = mongoose.model('Event', eventSchema);