import express from 'express';
import { addEvents, getEvents, updateEvents, deleteEvents } from '../controllers/eventController.js';

export const eventRouter = new express.Router();

//Route pour creer un nouvel evenement
eventRouter.post('/events', async (req, res) => {
    //appel du controler
    addEvents(req, res);
});

//Route pour recuperer/lire les evenements
eventRouter.get('/events', async (req, res) => {
    //appel du controler
    getEvents(req, res);
});

//route pour update un evenement
eventRouter.put('/events/:eventname', async (req, res) => {
    //controler
    updateEvents(req, res);
});

//route pour supprimer un event par nom 
eventRouter.delete('/events/:eventname', async (req, res) => {
    //appel du controler
    deleteEvents(req, res);
});