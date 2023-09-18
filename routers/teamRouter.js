import express from 'express';


export const teamRouter = new express.Router();

//Route pour creer un nouveau joueur
teamRouter.post('/teams', async (req, res) => {
    //appel controler
    addTeam(req, res);
});

//Route pour recuperer les joueurs
teamRouter.get('/teams', async (req, res) => {
    //appel controler
    getTeam(req, res);
});

//route pour update un joueur
teamRouter.put('/teams/:teamname', async (req, res) => {
    //appel controler
    updateTeam(req, res);
});

//route pour supprimer un joueur par nom 
teamRouter.delete('/teams/:teamname', async (req, res) => {
    //appel controler
    deleteTeam(req, res);
});