const Discord = require("discord.js")

module.exports = {

    name: "setantiraid",
    description: "Paramètre l'antiraid'",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "string",
            name: "état",
            description: "Antiraid ON ou OFF",
            required: true,
            autocomplete: true
        }
    ],

    async run(bot, message, args, db) {
        
       let etat = args.getString("état");
       if (etat !== "ON" && etat !== "OFF") return message.reply("Indique si le captcha doit être ON ou OFF !")


       if (etat === "OFF") {

        db.query(`UPDATE server SET antiraid = 'false' WHERE guild = '${message.guildId}'`)
        await message.reply("L'antiraid a bien été désactivé sur ce serveur !")

       } else {

        db.query(`UPDATE server SET antiraid = 'true' WHERE guild = '${message.guildId}'`)
        await message.reply(`L'antiraid a bien été activé !`)
       }

    }
}