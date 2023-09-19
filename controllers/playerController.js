import { Player } from "../models/player.js";

//fonction pour ajouter un joueur
export const addPlayer = async (req, res) => {
    const player = new Player(req.body)

    try {
        await player.save();
        res.status(201).send(player);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

//fonction pour recuper et lire tous les joueur
export const getPlayer = async (req, res) => {
    try {
        const players = await Player.find({})//Player est le nom du modele importé depuis player.js et prend le nom du modele dans la bdd mongo donc on demande a chercher tous les documents en rapport a modele Player
        res.json(players)// on demande a envoyer la reponse de la requette sous forme json
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//fonction pour update un joueur
export const updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await Player.findOneAndUpdate(
            { username: req.params.username }, // filtre pour trouver le pseudo du joueur
            { $set: req.body },
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
}

//fonction pour supprimer un joueur
export const deletePlayer = async (req, res) => {
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
}