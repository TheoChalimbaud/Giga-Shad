const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Kick un membre",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à kick",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
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
        if(!user) return message.reply("Pas de membre à kick")
        
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre à kick")

        let reason =  args.getString("raison")
        if(!reason) reason = "Pas de raison fournie."
            
        if (message.user.id === user.id) return message.reply("T'es débile mon reuf !")
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Il est trop puissant...")
        if(member && !member.kickable) return message.reply("Je ne peux pas kick ce membre !")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas kick cette personne.")

        let notify = args.get("notif")
        if(!notify) notify = false
        if(notify.value) {try {await user.send(`Tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}}

        await message.reply(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

        await member.kick(reason)
    }
}