import { Localisation } from '../models/localisation.js'

//fonction pour creer une localisation
export const addLocalisation = async (req, res) => {
    const localisation = new Localisation(req.body)
    console.log(req.body);
    try {
        await localisation.save();
        res.status(201).send(localisation);
    }
    catch (err) {
        res.status(400).send(err);
    }
}
//fonction pour recuperer et lire toutes les localisations
export const getLocalisation = async (req, res) => {
    try {
        const localisations = await Localisation.find();//localisation est le nom du modele importé depuis localisation.js et prend le nom du modele dans la bdd mongo donc on demande a chercher tous les documents en rapport a modele localisation
        res.json(localisations);// on demande a envoyer la reponse de la requette sous forme json
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//fonction pour update une localisation
export const updateLocalisation = async (req, res) => {
    try {
        const updatedLocalisation = await Localisation.findByIdAndUpdate(req.params.id, // filtre pour trouver le pseudo du joueur
            { $set: req.body },
            { new: true } //Cette option renvoie le joueur mis à jour plutôt que l'ancienne version
        )
        if (!updatedLocalisation) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'team not found' });
        }
        res.json({ message: 'localisation updated successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

//fonction pour supprimer une localisation
export const deleteLocalisation = async (req, res) => {
    try {
        const deletedlocalisation = await Localisation.findByIdAndDelete(req.params.id);
        // ici on veut supprimer par pays donc on utilise findOneAndDelete, si on voulait supprimer par id il fallait mettre findByIdAndDelete
        if (!deletedlocalisation) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'localisation not found' });
        }
        res.json({ message: 'localisation deleted successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
}