import express from 'express';
import { Team } from '../models/team.js'

export const router = new express.Router();

//Route pour recuperer les joueurs
router.get('/', async (req, res) => {
    //controler
    try {
        const teams = await Team.find();//team est le nom du modele importé depuis team.js et prend le nom du modele dans la bdd mongo donc on demande a chercher tous les documents en rapport a modele team
        res.json(teams);// on demande a envoyer la reponse de la requette sous forme json
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Route pour creer un nouveau joueur
router.post('/team', async (req, res) => {
    //controler
    const team = new Team(req.body)
    console.log(req.body);
    try {
        await team.save();
        res.status(201).send(team);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//route pour supprimer un joueur par nom 
router.delete('/team/:username', async (req, res) => {
    //controler
    try {
        const deletedteam = await Team.findOneAndDelete(req.params.username)
        // ici on veut supprimer par pseudo donc on utilise findOneAndDelete, si on voulait supprimer par id il fallait mettre findByIdAndDelete
        if (!deletedteam) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'team not found' });
        }
        res.json({ message: 'team deleted successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

//route pour update un joueur
router.put('/team/:username', async (req, res) => {
    //controler
    try {
        const updatedteam = await Team.findOneAndUpdate(
            { username: req.params.username }, // filtre pour trouver le pseudo du joueur
            {/*données a mettre a jour*/ },
            { new: true } //Cette option renvoie le joueur mis à jour plutôt que l'ancienne version
        )
        if (!updatedteam) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'team not found' });
        }
        res.json({ message: 'team updated successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
