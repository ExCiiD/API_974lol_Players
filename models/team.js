import mongoose from 'mongoose';
import { Localisation } from './localisation.js'
import { Player } from './player.js'

const teamSchema = new mongoose.Schema({
    teamType: {
        //donner une option "type": orga(eventcreators) et/ou gamers(gaming only)
        type: String,
        enum: ['orga', 'gamers'],
        required: true,
    },
    teamName: {
        type: String,
        content: String,
        required: true,
    },
    teamLocalisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Localisation,
    },
    teamAchievements: {
        //winner ou top 2/3 d'un event, donc recuperer l'id d'un event ??
        type: String,
        content: String,
    },
    teamCreationDate: {
        Date,
    },
    teamDisbandDate: {
        Date,
    },
    teamCurrentRoster: [
        {
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            },
            statut: {
                type: String,
                enum: ['current', 'sub', 'old'],
                default: 'current',
            },
        },
    ],
    teamOldPlayers: [
        //ajouter dans le controller une fonction qui fait passé le statut de current a old lors d'un update d'un joueur
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

// Validation personnalisée pour limiter le nombre de joueurs dans teamCurrentRoster à 7
teamSchema.path('teamCurrentRoster').validate(function (value) {
    return value.length <= 7;
}, 'Le roster ne peut contenir que 7 joueurs au maximum.');

export const Team = mongoose.model('Team', teamSchema);