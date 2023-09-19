import { Team } from '../models/team.js';
import { Player } from '../models/player.js';

//fonction pour creer une equipe
export const addTeam = async (req, res) => {
    const team = new Team(req.body)
    console.log(req.body);
    try {
        await team.save();
        res.status(201).send(team);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

//fonction pour recuperer et lire toutes les equipes
export const getTeam = async (req, res) => {
    try {
        const teams = await Team.find();//team est le nom du modele importé depuis team.js et prend le nom du modele dans la bdd mongo donc on demande a chercher tous les documents en rapport a modele team
        res.json(teams);// on demande a envoyer la reponse de la requette sous forme json
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//fonction pour update une equipe
export const updateTeam = async (req, res) => {
    try {
        const updatedteam = await Team.findOneAndUpdate(
            { teamname: req.params.teamName }, // filtre pour trouver le pseudo du joueur
            { $set: req.body },
            { new: true } //Cette option renvoie le joueur mis à jour plutôt que l'ancienne version
        )
        if (!updatedteam) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'team not found' });
        }
        res.json({ message: 'team updated successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

//fonction pour delete une equipe
export const deleteTeam = async (req, res) => {
    try {
        const deletedteam = await Team.findOneAndDelete(req.params.teamName)
        // ici on veut supprimer par pseudo donc on utilise findOneAndDelete, si on voulait supprimer par id il fallait mettre findByIdAndDelete
        if (!deletedteam) {
            //si on ne trouve pas le joueur (le username n'est pas bon), on retourne un message d'erreur 
            return res.status(404).json({ message: 'team not found' });
        }
        res.json({ message: 'team deleted successfully' });
    }
    catch (err) {
        res.status(500).send(err);
    }
}

//fonction pour ajouter un joueur titulaire au current roster
export const addPlayerToCurrentRoster = async (req, res) => {
    try {
        // Vérifiez d'abord si l'équipe existe
        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({ message: "Équipe non trouvée" });
        }

        // Vérifiez si le current roster est complet (limite de 7 joueurs)
        if (team.teamCurrentRoster.length >= 7) {
            return res.status(400).json({ message: "Le current roster est complet" });
        }

        // Recherchez le joueur à ajouter en fonction de son ID
        const playerToAdd = await Player.findById(req.params.playerid);

        if (!playerToAdd) {
            return res.status(404).json({ message: "Joueur à ajouter non trouvé" });
        }

        // Ajoutez le joueur au current roster
        /*  const newPlayer = {
             player: `${playerToAdd}`, // L'ID du joueur à ajouter
             statut: 'current',
         }; */
        team.teamCurrentRoster.push(newPlayer);

        // Sauvegardez les modifications dans la base de données
        await team.save();

        res.json({ message: 'Joueur ajouté au current roster avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

//fonction pour ajouter un joueur sub au current roster
export const addSubPlayerToCurrentRoster = async (req, res) => {
    try {
        // Vérifiez d'abord si l'équipe existe
        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({ message: "Équipe non trouvée" });
        }

        // Vérifiez si le current roster est complet (limite de 7 joueurs)
        if (team.teamCurrentRoster.length >= 7) {
            return res.status(400).json({ message: "Le current roster est complet" });
        }

        // Recherchez le joueur à ajouter en fonction de son ID
        const playerToAdd = await Player.findById(req.params.playerid);

        if (!playerToAdd) {
            return res.status(404).json({ message: "Joueur à ajouter non trouvé" });
        }

        // Ajoutez le joueur au current roster
        const newPlayer = {
            player: playerToAdd, // L'ID du joueur à ajouter
            statut: 'sub',
        };
        team.teamCurrentRoster.push(newPlayer);

        // Sauvegardez les modifications dans la base de données
        await team.save();

        res.json({ message: 'Joueur ajouté au current roster avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};




