const Discord = require("discord.js");

module.exports = {

    name: "mc",
    description: "Fait apparaître un élément de minecraft à collectionner",
    permission: "Aucune",
    dm: false,
    category: "Minecraft",
    options: [],

    async run(bot, message, args, db) {

        //cherche un item aléatoire dans la bdd
        const req = await new Promise((resolve, reject) => {
            db.query(`SELECT nomFR, imageLink FROM minecraftitems ORDER BY RAND() LIMIT 1`, (err, req) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(req);
                }
            });
        });

        const embed = new Discord.EmbedBuilder()
        .setColor("#ffd505")
        .setTitle(`${req[0].nomFR}`)
        .setImage(`${req[0].imageLink}`)
        .setTimestamp();

        await message.reply({ embeds: [embed] });
  },
};
