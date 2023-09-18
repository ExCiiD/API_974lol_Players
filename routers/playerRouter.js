import express from 'express';
import { addPlayer, getPlayer, updatePlayer, deletePlayer } from '../controllers/playerController.js';
export const playerRouter = new express.Router();

//Route pour creer un nouveau joueur
playerRouter.post('/player', async (req, res) => {
    //controler
    addPlayer(req, res);
});

//Route pour recuperer les joueurs
playerRouter.get('/players', async (req, res) => {
    //controler
    getPlayer(req, res);
});

//route pour update un joueur
playerRouter.put('/player/:username', async (req, res) => {
    //controler
    updatePlayer(req, res);
});

//route pour supprimer un joueur par nom
playerRouter.delete('/player/:username', async (req, res) => {
    //controler
    deletePlayer(req, res);
});