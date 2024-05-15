const { ButtonStyle } = require("discord.js");
const Discord = require("discord.js")

module.exports = {

    name: "pdp",
    description: "Affiche votre photo de profil, ou celle d'un autre membre",
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

        let avatarEmbed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Photo de profil de ${user.tag} :`)
            .setImage(`${user.displayAvatarURL({size:512, format: `png`, dynamic:true})}`)
            .setTimestamp();

        let bouton = new Discord.ButtonBuilder()
        .setLabel(`Lien`)
        .setStyle(ButtonStyle.Link)
        .setURL(`${user.avatarURL({size:4096})}`);

        let row = new Discord.ActionRowBuilder().addComponents(bouton);

        await message.reply({embeds: [avatarEmbed], components: [row]})
    }
}