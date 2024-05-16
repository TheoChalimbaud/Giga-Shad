const https = require('https');
const config = require("./../config");
const API_KEY = config.RiotApi;

module.exports = async (id) => {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
        
        https.get(apiUrl, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                const summoner = JSON.parse(data);

                if (summoner.status && summoner.status.status_code === 404 && summoner.status.message.includes('Data not found')) {
                    reject(`Joueur introuvable : ${summoner.status.message}`);
                } else {
                    const soloQueueInfo = [];
                    const flexQueueInfo = [];

                    summoner.forEach((entry) => {
                        const { queueType, tier, rank, leaguePoints, wins, losses, veteran, inactive, freshBlood, hotStreak } = entry;
                        
                        if (queueType === "RANKED_SOLO_5x5") {
                            soloQueueInfo.push({ tier, rank, leaguePoints, wins, losses, veteran, inactive, freshBlood, hotStreak });
                        } else if (queueType === "RANKED_FLEX_SR") {
                            flexQueueInfo.push({ tier, rank, leaguePoints, wins, losses, veteran, inactive, freshBlood, hotStreak });
                        }
                    });

                    // Ajouter une entrée "UNRANKED" si la liste est vide
                    if (soloQueueInfo.length === 0) {
                        soloQueueInfo.push({
                            tier: 'UNRANKED',
                            rank: '',
                            leaguePoints: 0,
                            wins: 0,
                            losses: 0,
                            veteran: false,
                            inactive: false,
                            freshBlood: false,
                            hotStreak: false
                        });
                    }

                    if (flexQueueInfo.length === 0) {
                        flexQueueInfo.push({
                            tier: 'UNRANKED',
                            rank: '',
                            leaguePoints: 0,
                            wins: 0,
                            losses: 0,
                            veteran: false,
                            inactive: false,
                            freshBlood: false,
                            hotStreak: false
                        });
                    }

                    resolve({ soloQueue: soloQueueInfo, flexQueue: flexQueueInfo });
                }
            });
        }).on('error', (error) => {
            console.log("j'arrive la ?");
            reject(`Erreur lors de la requête : ${error.message}`);
        });
    });
};
