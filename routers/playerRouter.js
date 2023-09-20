import express from 'express';
import { addPlayer, getPlayer, updatePlayer, deletePlayer, getPlayersFromTeam } from '../controllers/playerController.js';
export const playerRouter = new express.Router();

//Route pour creer un nouveau joueur
playerRouter.post('/players', async (req, res) => {
    //controler
    addPlayer(req, res);
});

//Route pour recuperer les joueurs
playerRouter.get('/players', async (req, res) => {
    //controler
    getPlayer(req, res);
});

//route pour chercher tous les joueurs d'une équipe
playerRouter.delete('/players/:idteam', async (req, res) => {
    //controler
    getPlayersFromTeam(req, res);
});

//route pour update un joueur
playerRouter.put('/players/:username', async (req, res) => {
    //controler
    updatePlayer(req, res);
});

//route pour supprimer un joueur par nom
playerRouter.delete('/players/:username', async (req, res) => {
    //controler
    deletePlayer(req, res);
});
