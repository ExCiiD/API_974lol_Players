import express from 'express';	
import dotenv from 'dotenv';
//routes
import { playerRouter } from './routers/playerRouter.js';
import { eventRouter } from './routers/eventRouter.js';
import { localisationRouter } from './routers/localisationRouter.js';
import { teamRouter } from './routers/teamRouter.js';

//connection a la base de donnés
import { connectDB } from './db/mongodb.js';
dotenv.config();
connectDB();

const port = 8000;
const app = express();

app.use(express.json());
app.use(playerRouter, eventRouter, localisationRouter, teamRouter);
app.get('/', (req, res) => { res.send("API LOL974") });


app.listen(port, () => 
    console.log(`Le serveur a démarré au port ${port}`)
);


