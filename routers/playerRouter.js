import express from 'express';
import { Player } from '../models/player.js'

export const router = new express.Router();

//Route pour recuperer les joueurs
router.get('/', async (req, res) => {
    //controler
    try {
        const players = await Player.find();//Player est le nom du modele importé depuis player.js et prend le nom du modele dans la bdd mongo donc on demande a chercher tous les documents en rapport a modele Player
        res.json(players);// on demande a envoyer la reponse de la requette sous forme json
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Route pour creer un nouveau joueur
router.post('/player', async (req, res) => {
    //controler
    const player = new Player(req.body)
    console.log(req.body);
    try {
        await player.save();
        res.status(201).send(player);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//route pour supprimer un joueur par nom 
router.delete('/player/:username', async (req, res) => {
    //controler
    try {
        const deletedPlayer = await Player.findOneAndDelete(req.params.username)
        // ici on veut supprimer par pseudo donc on utilise findOneAndDelete, si on voulait supprimer par id il fallait mettre findByIdAndDelete
        if (!deletedPlayer) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'Player not found' });
        } 
        res.json({ message: 'Player deleted successfully' });
    }
    catch (err) {
    res.status(500).send(err);
    }
});

//route pour update un joueur
router.put('/player/:username', async (req,res) => {
    //controler
    try {
        const updatedPlayer = await Player.findOneAndUpdate(
            {username : req.params.username}, // filtre pour trouver le pseudo du joueur
            {/*données a mettre a jour*/},
            { new: true } //Cette option renvoie le joueur mis à jour plutôt que l'ancienne version
        )
        if (!updatedPlayer) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json({ message: 'Player updated successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
