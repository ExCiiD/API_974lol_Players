import express from 'express';
import { Localisation } from '../models/localisation.js'

export const router = new express.Router();

//Route pour recuperer les joueurs
router.get('/', async (req, res) => {
    //controler
    try {
        const localisations = await Localisation.find();//localisation est le nom du modele importé depuis localisation.js et prend le nom du modele dans la bdd mongo donc on demande a chercher tous les documents en rapport a modele localisation
        res.json(localisations);// on demande a envoyer la reponse de la requette sous forme json
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Route pour creer un nouveau joueur
router.post('/localisation', async (req, res) => {
    //controler
    const localisation = new Localisation(req.body)
    console.log(req.body);
    try {
        await localisation.save();
        res.status(201).send(localisation);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//route pour supprimer un joueur par nom 
router.delete('/localisation/:username', async (req, res) => {
    //controler
    try {
        const deletedlocalisation = await Localisation.findOneAndDelete(req.params.username)
        // ici on veut supprimer par pseudo donc on utilise findOneAndDelete, si on voulait supprimer par id il fallait mettre findByIdAndDelete
        if (!deletedlocalisation) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'localisation not found' });
        }
        res.json({ message: 'localisation deleted successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

//route pour update un joueur
router.put('/localisation/:username', async (req, res) => {
    //controler
    try {
        const updatedlocalisation = await Localisation.findOneAndUpdate(
            { username: req.params.username }, // filtre pour trouver le pseudo du joueur
            {/*données a mettre a jour*/ },
            { new: true } //Cette option renvoie le joueur mis à jour plutôt que l'ancienne version
        )
        if (!updatedlocalisation) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'localisation not found' });
        }
        res.json({ message: 'localisation updated successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
