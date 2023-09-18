import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        content: String,
    },
    LastName: {
        type: String,
        content: String,
    },
    BirthDate: {
        type: Date,
        content: String,
    },
    playerLocalisation: {
        /* id localisation ?*/
    },
    username: {
        type: String,
        content: String,
        required: true,
    },
    role: {
        type: String,
        content: String,
    },
    rank: {
        type: String,
        content: String,
    },
    inGameName: {
        type: String,
        content: String,
        required: true,
    },
    Achievements: {
        type: String,
        /* achievement id */
        content: String,
    },
    currentTeam: {
        type: String,
        /* team id */
        content: String,
    },
    LastTeams: {
        type: String,
        /* team id */
        content: String,
    },
    mainChamps: {
        type: String,
        /* champs id? ou juste les nom de champions.*/
        content: String,
    },


});

export const Player = mongoose.model('Player', playerSchema);