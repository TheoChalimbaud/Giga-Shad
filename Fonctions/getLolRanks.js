const https = require('https');
const config = require("./../config")
const API_KEY = config.RiotApi;

module.exports = async (id) => {
    return new Promise((resolve, reject) => {
        // URL de l'API de Riot Games pour récupérer les informations du joueur
        const apiUrl = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
        // Effectuer une requête HTTP GET à l'API de Riot Games
        https.get(apiUrl, (response) => {
            let data = '';

            // Concaténer les morceaux de données reçus
            response.on('data', (chunk) => {
                data += chunk;
            });

            // Une fois que toute la réponse est reçue
            response.on('end', () => {
                // Analyser la réponse JSON
                const summoner = JSON.parse(data);

                // Vérifier si la réponse contient un statut d'erreur
                if (summoner.status && summoner.status.status_code === 404 && summoner.status.message.includes('Data not found')) {
                    reject(`Joueur introuvable : ${summoner.status.message}`);
                } else {
                    // Initialiser deux listes pour stocker les informations de la solo queue et de la flex queue
                    const soloQueueInfo = [];
                    const flexQueueInfo = [];

                    // Parcourir chaque entrée dans le tableau summoner
                    summoner.forEach((entry) => {
                        // Extraire les informations pertinentes de chaque entrée
                        const { queueType, tier, rank, leaguePoints, wins, losses, veteran, inactive, freshBlood, hotStreak } = entry;
                        
                        // Ajouter les informations à la liste appropriée en fonction de la queueType
                        if (queueType === "RANKED_SOLO_5x5") {
                            soloQueueInfo.push({ tier, rank, leaguePoints, wins, losses, veteran, inactive, freshBlood, hotStreak });
                        } else if (queueType === "RANKED_FLEX_SR") {
                            flexQueueInfo.push({ tier, rank, leaguePoints, wins, losses, veteran, inactive, freshBlood, hotStreak });
                        }
                    });

                    // Résoudre les deux listes
                    resolve({ soloQueue: soloQueueInfo, flexQueue: flexQueueInfo });
                }
            });
        }).on('error', (error) => {
            reject(`Erreur lors de la requête : ${error.message}`);
        });
    });
};

