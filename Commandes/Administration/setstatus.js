const Discord = require("discord.js")

module.exports = {

    name: "setstatus",
    description: "Permet de modifier le status du bot (owner only)",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "string",
            name: "activity",
            description: "L'activité du bot",
            required: true,
            autocomplete: true
        }, {
            type: "string",
            name: "status",
            description: "Status du bot",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "lien",
            description: "Lien du stream",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {
        
        if (message.user.id != "394145474850062346") return message.reply({content:"Commande réservée au propriétaire du bot. T'as cru quoi ?", ephemeral: true})

        let activity = args.getString("activity");
        if (activity !== "Listening" && activity !== "Playing" && activity !== "Competiting" && activity !== "Watching" && activity !== "Streaming" && activity !== "Custom") return messages.reply("Il faut suivre l'autocomplete !")

        let status = args.getString("status");

        if (activity === "Streaming" && args.getString("lien") === null) return message.reply("Il faut mettre un lien de stream pour cette activité.");

        if (activity === "Streaming") await bot.user.setActivity(status, {type: Discord.ActivityType[activity], url: args.getString("lien")})
        else await bot.user.setActivity(status, {type: Discord.ActivityType[activity]})
        await message.reply({content:"Status mis à jour.", ephemeral: true});
    }
}