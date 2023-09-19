import { Event } from '../models/event.js';

//fonction pour ajouter un evenement
export const addEvents = async (req, res) => {
    const event = new Event(req.body)

    try {
        await event.save();
        res.status(201).send(event);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

//fonction pour recuprer tous les evenement
export const getEvents = async (req, res) => {

    try {
        const events = await Event.find();//event est le nom du modele importé depuis event.js et prend le nom du modele dans la bdd mongo donc on demande a chercher tous les documents en rapport a modele event
        res.json(events);// on demande a envoyer la reponse de la requette sous forme json
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//fonction pour update un evenement
export const updateEvents = async (req, res) => {

    try {
        const updatedevent = await Event.findOneAndUpdate(
            { eventname: req.params.eventName }, // filtre pour trouver le pseudo du joueur
            { $set: req.body },
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
}

//fonction pour supprimer un evenement
export const deleteEvents = async (req, res) => {
    try {
        const deletedevent = await Event.findOneAndDelete(req.params.eventName)
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
}