const Discord = require("discord.js")

module.exports = {

    name: "unban",
    description: "Unban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "La personne à débannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du débanissement",
            required: false,
            autocomplete: false
        }, {
            type: "boolean",
            name: "notif",
            description: "Si il doit y avoir un MP envoyé au débanni",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        
        try{

            let user = args.getUser("utilisateur")
            if(!user) return message.reply("Utilisateur introuvable")

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";
            
            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Cet utilisateur n'est pas banni.")

            let notify = args.get("notif")
            if(!notify) notify = false
            if(notify.value) {try{await user.send(`Tu as été débanni par ${message.user.tag} pour la raison : \`${reason}\``)} catch (err) {}}
            

            await message.reply(`${message.user} a débanni ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.members.unban(user, reason)

        } catch (err) {

            return message.reply("Utilisateur introuvable")
        }
    }
}