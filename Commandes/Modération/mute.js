const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "mute",
    description: "Mute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Durée du mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Raison du mute",
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

        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre !")

        let time = args.getString("temps")
        if(!time) return message.reply("Pas de temps !")
        if(isNaN(ms(time))) return message.reply("Pas le bon format !")
        if (ms(time) > 2419200000) return message.reply("Le mute ne peux pas durer plus de 28 jours !")

        let reason = args.getString("raison")
        if (!reason) reason = "Pas de raison fournie."

        if(message.user.id === user.id) return message.reply("Te mute pas tout seul gros malin !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Il est trop puissant pour être mute...")
        if(!member.moderatable) return message.reply("Je ne peux pas mute ce membre.")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas mute cette personne.")
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est déjà mute !")

        let notify = args.get("notif")
        if(!notify) notify = false
        if(notify.value) {try {await user.send(`Tu as été mute du serveur ${message.guild.name} par ${message.user.tag} pendant ${time} pour la raison : \`${reason}\``)} catch(err) {}}

        await message.reply(`${message.user} a mute ${user.tag} pour la raison : \`${reason}\``)

        await member.timeout(ms(time), reason)
    }
    
}