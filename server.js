import express from 'express';	
import { playerRouter } from './routers/playerRouter.js';
import { eventRouter } from './routers/eventRouter.js';
import { localisationRouter } from './routers/localisationRouter.js';
import { teamRouter } from './routers/teamRouter.js';
import dotenv from 'dotenv';
import { connectDB } from './db/mongodb.js';

dotenv.config();
connectDB();

const port = 8000;
const app = express();

app.use(express.json());
app.use(playerRouter, eventRouter, localisationRouter, teamRouter);
app.get('/', (req, res) => {res.send("hello world")});

console.log("test"); 

app.listen(port, () => 
    console.log(`Le serveur a démarré au port ${port}`)
);


