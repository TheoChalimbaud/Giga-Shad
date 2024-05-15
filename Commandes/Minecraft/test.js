const Discord = require("discord.js")

module.exports = {

    name: "test",
    description: "test",
    permission: "Aucune",
    dm: true,
    category: "Minecraft",
    options: [],

    async run(bot, message, args, db) {


        let Embed = new Discord.EmbedBuilder()
            .setColor("#ffd505")
            .setTitle(`Test d'embed pour jeu MC`)
            .setImage(`https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/28/Potion_of_Swiftness.gif`)
            .setTimestamp();

        await message.reply({embeds: [Embed]})
    }
}