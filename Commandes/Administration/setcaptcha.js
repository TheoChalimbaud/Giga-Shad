const Discord = require("discord.js")

module.exports = {

    name: "setcaptcha",
    description: "Paramètre le captcha",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "string",
            name: "état",
            description: "Captcha ON ou OFF",
            required: true,
            autocomplete: true
        }, {
            type: "channel",
            name: "salon",
            description: "Salon du captcha (à donner si ON)",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {
        
       let etat = args.getString("état");
       if (etat !== "ON" && etat !== "OFF") return message.reply("Indique si le captcha doit être ON ou OFF !")


       if (etat === "OFF") {

        db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guildId}'`)
        await message.reply("Le captcha a bien été désactivé sur ce serveur !")

       } else {

        let channel = args.getChannel("salon");
        if (!channel) return message.reply("Merci d'indiquer un salon pour activer le captcha !")
        channel = message.guild.channels.cache.get(channel.id)
        if (!channel) return message.reply("Pas de salon trouvé !")

        db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guildId}'`)
        await message.reply(`Le captcha a bien été activé sur le salon ${channel} !`)
       }

    }
}