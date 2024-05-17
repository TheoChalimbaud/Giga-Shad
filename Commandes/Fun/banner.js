const { ButtonStyle } = require("discord.js");
const axios = require('axios');
const Discord = require("discord.js")

module.exports = {

    name: "banner",
    description: "Affiche votre bannière de profil, ou celle d'un autre membre",
    permission: "Aucune",
    dm: true,
    category: "Fun",
    options: [
        {
            type: "user",
            name: "membre",
            description: "La personne à inspecter",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        
        let user = args.getUser("membre")
        if(!user) user = message.user;
        

        let bannerEmbed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Bannière de ${user.tag} :`)
            .setImage(`${user.bannerURL({size:512, format: `png`, dynamic:true})}`)
            .setTimestamp();

        let bouton = new Discord.ButtonBuilder()
        .setLabel(`Lien`)
        .setStyle(ButtonStyle.Link)
        .setURL(`${user.bannerURL({size:4096})}`);

        let row = new Discord.ActionRowBuilder().addComponents(bouton);

        await message.reply({embeds: [bannerEmbed], components: [row]})
    }
}