const axios = require('axios');

module.exports = async () => {
    try {
        // Effectuer une requête HTTP GET pour obtenir le JSON
        const response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');

        // Extraire la première donnée du tableau
        const version = response.data[0];

        return version; // Renvoyer la première version
    } catch (error) {
        throw new Error('Erreur : ' + error); // Lancer l'erreur à nouveau si nécessaire
    }
};