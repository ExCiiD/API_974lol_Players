import express from 'express';
import { addLocalisation, getLocalisation, deleteLocalisation } from '../controllers/localisationController.js';

export const localisationRouter = new express.Router();

//Route pour creer une nouvelle localisation
localisationRouter.post('/localisation', async (req, res) => {
    //controler
    addLocalisation(req, res);
});

//Route pour recuperer les localisations
localisationRouter.get('/localisations', async (req, res) => {
    //controler
    getLocalisation(req, res);
});

//route pour supprimer une localisation
localisationRouter.delete('/localisation/:id', async (req, res) => {
    //controler
    deleteLocalisation(req, res);
});


