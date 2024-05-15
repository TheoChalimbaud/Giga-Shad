const https = require('https');
const config = require("./../config")
const API_KEY = config.RiotApi;

module.exports = async (PUUID) => {
    return new Promise((resolve, reject) => {
        // URL de l'API de Riot Games pour récupérer les informations du joueur
        const apiUrl = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${PUUID}?api_key=${API_KEY}`;

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
                    // Obtenir les informations du compte
                    const accountId = summoner.id;
                    const profileIconId = summoner.profileIconId;
                    const summonerLevel = summoner.summonerLevel;

                    // Résoudre les informations du compte
                    resolve({ accountId, profileIconId, summonerLevel });
                }
            });
        }).on('error', (error) => {
            reject(`Erreur lors de la requête : ${error.message}`);
        });
    });
}