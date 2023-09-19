import mongoose from 'mongoose';
import { Localisation } from './localisation.js';
import { Player } from './player.js';



const teamSchema = new mongoose.Schema({
    teamType: {
        //donner une option "type": orga(eventcreators) et/ou gamers(gaming only)
        type: [String],
        enum: ['orga', 'gamers'],
        required: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    teamLocalisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Localisation,
    },
    teamAchievements: {
        //winner ou top 2/3 d'un event, donc recuperer l'id d'un event ??
        type: String,
    },
    teamCreationDate: {
        Date,
    },
    teamDisbandDate: {
        Date,
    },
    //ajouter dans le controller une fonction pour ajouter un nouveau joueur dans le current roster (updateTeamRoster)
    teamCurrentRoster: [
        {
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            },
            statut: {
                type: String,
                enum: ['current', 'sub'],
                default: 'current',
            },
        },
    ],
    teamOldPlayers: [
        //ajouter dans le controller une fonction qui fait passé le joueur de current a old lors d'un update d'un joueur (updateTeamRoster)
        {
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            },
            statut: {
                type: String,
                enum: ['old'],
                default: 'old',
            },
        },
    ],

});


//MIDDLEWARES///////////////////////////////////////////////
teamSchema.pre('find', function (next) {
    this.populate([
        /* { path: 'teamCurrentRoster.player', select: 'username' }, */ //fais crasher le serveur, peut etre creer un model roster et les liers aux equipes.
        { path: 'teamLocalisation' }
    ]);
    next();
});
//MIDDLEWARES///////////////////////////////////////////////


// Validation personnalisée pour limiter le nombre de joueurs dans teamCurrentRoster à 7
teamSchema.path('teamCurrentRoster').validate(function (value) {
    return value.length <= 7;
}, 'Le roster ne peut contenir que 7 joueurs au maximum.');


export const Team = mongoose.model('Team', teamSchema);