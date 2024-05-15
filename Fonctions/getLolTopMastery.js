

module.exports = async (count, puuid) => {
    return new Promise((resolve, reject) => {
        // URL de l'API de Riot Games pour récupérer les informations du joueur
        const apiUrl = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=${count}&api_key=${API_KEY}`;
        // Effectuer une requête HTTP GET à l'API de Riot Games
        https.get(apiUrl, async (response) => {
            let data = '';

            // Concaténer les morceaux de données reçus
            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', async () => {
                const datas = JSON.parse(data);
                // Map pour récupérer uniquement championId, championLevel et championPoints
                const Infos = await Promise.all(datas.map(async (mastery) => {
                    const champName = await getLolChampName(mastery.championId);
                    return {
                        championId: mastery.championId,
                        championLevel: mastery.championLevel, 
                        championPoints: mastery.championPoints,
                        championName: champName
                    };
                }));

                resolve(Infos);
            });
        }).on('error', (error) => {
            reject(`Erreur lors de la requête : ${error.message}`);
        });
    });
};
