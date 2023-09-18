import express from 'express';
import { Event } from '../models/event.js'

export const router = new express.Router();

//Route pour recuperer les joueurs
router.get('/', async (req, res) => {
    //controler
    try {
        const events = await Event.find();//event est le nom du modele importé depuis event.js et prend le nom du modele dans la bdd mongo donc on demande a chercher tous les documents en rapport a modele event
        res.json(events);// on demande a envoyer la reponse de la requette sous forme json
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Route pour creer un nouveau joueur
router.post('/event', async (req, res) => {
    //controler
    const event = new Event(req.body)
    console.log(req.body);
    try {
        await event.save();
        res.status(201).send(event);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//route pour supprimer un joueur par nom 
router.delete('/event/:username', async (req, res) => {
    //controler
    try {
        const deletedevent = await Event.findOneAndDelete(req.params.username)
        // ici on veut supprimer par pseudo donc on utilise findOneAndDelete, si on voulait supprimer par id il faudrait mettre findByIdAndDelete
        if (!deletedevent) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'event not found' });
        }
        res.json({ message: 'event deleted successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

//route pour update un joueur
router.put('/event/:username', async (req, res) => {
    //controler
    try {
        const updatedevent = await Event.findOneAndUpdate(
            { username: req.params.username }, // filtre pour trouver le pseudo du joueur
            {/*données a mettre a jour*/ },
            { new: true } //Cette option renvoie le joueur mis à jour plutôt que l'ancienne version
        )
        if (!updatedevent) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'event not found' });
        }
        res.json({ message: 'event updated successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
