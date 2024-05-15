const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "unmute",
    description: "Unmute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à unmute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Raison de l'unmute",
            required: false,
            autocomplete: false
        }, {
            type: "boolean",
            name: "notif",
            description: "Si il doit y avoir un MP envoyé",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre");
        if(!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie.";

        if(!member.moderatable) return message.reply("Je ne peux pas unmute ce membre.")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest)<= 0) return message.reply("Vous ne pouvez pas unmute ce membre !")
        if(!member.isCommunicationDisabled()) return message.reply("Ce membre n'est pas mute.")

        let notify = args.get("notif")
        if(!notify) notify = false
        if(notify.value) {try{await user.send(`Vous avez été unmute par ${message.user} pour la raison : \`${reason}\``)} catch (err) {}}

        await message.reply(`${message.user} a unmute ${user.tag} pour la raison : \`${reason}\``)

        await member.timeout(null, reason)
    }
    
}