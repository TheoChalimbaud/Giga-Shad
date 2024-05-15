const Discord = require("discord.js")

module.exports = {

    name: "ticket",
    description: "Envoie l'embed de création de ticket",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [],

    async run(bot, message, args, db) {
        
       let Embed = new Discord.EmbedBuilder()
       .setColor("#45b6fe")
       .setTitle("Création d'un ticket")
       .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
       .setDescription("Créer un ticket")
       .setTimestamp()
       .setFooter({text:bot.user.username, iconURL:bot.user.displayAvatarURL({dynamic:true})})

       const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
       .setCustomId("ticket")
       .setLabel("Créer un ticket")
       .setStyle(Discord.ButtonStyle.Primary)
       .setEmoji("📥"))

       await message.channel.send({embeds: [Embed], components: [btn]})
    }
}