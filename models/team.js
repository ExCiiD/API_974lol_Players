import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    teamType: {
        //donner une option "type": orga(eventcreators) et/ou gamers(gaming only)
        required: true,
    },
    teamName: {
        type: String,
        content: String,
        required: true,
    },
    teamLocalisation: {
        type: String,/* id localisation */
        content: String,
    },
    teamAchievements: {
        type: String,
        content: String,
    },
    teamCreationDate: {
        type: Date,
        content: String,
    }
    /* teamRoster: {
        a voir si on peut ajouter, vus qu'une equipe peut avoir eu plusieurs roster(composition d'eqipe) il faudra donc ajouter une date pour chaque roster
    } */

});

export const team = mongoose.model('Team', teamSchema);