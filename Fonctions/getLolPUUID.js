const https = require('https');
const config = require("./../config")
const API_KEY = config.RiotApi;

module.exports = async (summonerIdentifier) => {
    return new Promise((resolve, reject) => {
        // Vérifier si summonerIdentifier contient un #
        if (!summonerIdentifier.includes('#')) {
            reject('Le pseudo doit être fourni avec un tag sous la forme "pseudo#tag".');
        }

        // Diviser le nom d'utilisateur et le tag
        const [summonerName, summonerTag] = summonerIdentifier.split('#');

        // Vérifier la longueur du pseudo et du tag (un pseudo fait obligatoirement entre 3 et 16 caractères, le tag entre 3 et 5)
        if (summonerName.length < 3 || summonerName.length > 16) {
            reject('Le pseudo est incorrect.');
        }

        if (summonerTag.length < 3 || summonerTag.length > 5) {
            reject('Le tag est incorrect.');
        }

        // URL de l'API de Riot Games pour récupérer les informations du joueur
        const apiUrl = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${API_KEY}`;

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
                    reject(`Le joueur est introuvable, vérifiez l'orthographe`);
                } else {
                    // Obtenir l'identifiant du joueur
                    const summonerPUUID = summoner.puuid;
                    resolve(summonerPUUID); // Renvoyer le PUUID résolu
                }
            });
        }).on('error', (error) => {
            reject(`Erreur lors de la requête : ${error.message}`);
        });
    });
};
