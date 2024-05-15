const axios = require('axios');
const getLolLastVersion = require('./getLolLastVersion.js');

module.exports = async (key) => {
    try {
        const lastVer = await getLolLastVersion();
        // Effectuer une requête HTTP GET pour obtenir le JSON
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${lastVer}/data/fr_FR/champion.json`);

        // Obtenir les données des champions
        const championsData = Object.values(response.data.data);

        // Chercher le nom du champion à partir de son ID
        const champName = championsData.find(champion => champion.key === `${key}`).name;

        return champName; // Renvoyer le nom du champion
    } catch (error) {
        throw new Error('Erreur : ' + error); // Lancer l'erreur à nouveau si nécessaire
    }
};
