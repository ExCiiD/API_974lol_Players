import mongoose from 'mongoose';
import { Team } from './team.js';
import { Localisation } from './localisation.js';

const playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    playerLocalisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Localisation,
    },
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    rank: {
        type: String,
    },
    inGameName: {
        type: String,
        required: true,
    },
    achievements: {
        type: String,
        /* achievement id */
    },
    currentTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Team,
    },
    lastTeams: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Team,
    },
    mainChamps: {
        type: String,
        /* champs id? ou juste les nom de champions.*/
    },
});

//MIDDLEWARES///////////////////////////////////////////////
//middleware qui s'exécute avant (.pre) qu'une requête de recherche (find)(voir controllers , fonction "getplayer") s'execute afin de ne remplir que le "teamName" dans le currentTeam au lieu de l'objectIf donné 
playerSchema.pre('find', function (next) {
    this.populate([
        { path: 'currentTeam', select: 'teamName' }
    ]);
    next();
});
playerSchema.pre('find', function (next) {
    this.populate([
        { path: 'lastTeams', select: 'teamName' }
    ]);
    next();
});
playerSchema.pre('find', function (next) {
    this.populate([
        { path: 'playerLocalisation' }
    ]);
    next();
});
//MIDDLEWARES///////////////////////////////////////////////

export const Player = mongoose.model('Player', playerSchema);