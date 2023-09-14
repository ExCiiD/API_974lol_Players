import express from 'express';	
import {router} from './routes/playerRoutes.js';
import dotenv from 'dotenv';
import { connectDB } from './db/mongodb.js';

dotenv.config();
connectDB();

const port = 8000;
const app = express();

app.use(express.json());
app.use( router );
app.get('/', (req, res) => {res.send("hello world")});

console.log("test"); 

app.listen(port, () => 
    console.log(`Le serveur a démarré au port ${port}`)
);


