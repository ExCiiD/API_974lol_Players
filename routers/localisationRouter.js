import express from 'express';
import { addLocalisation, getLocalisation, deleteLocalisation } from '../controllers/localisationController.js';

export const localisationRouter = new express.Router();

//Route pour creer une nouvelle localisation
localisationRouter.post('/localisations', async (req, res) => {
    //controler
    addLocalisation(req, res);
});

//Route pour recuperer les localisations
localisationRouter.get('/localisations', async (req, res) => {
    //controler
    getLocalisation(req, res);
});

//route pour supprimer une localisation
localisationRouter.delete('/localisations/:id', async (req, res) => {
    //controler
    deleteLocalisation(req, res);
});


