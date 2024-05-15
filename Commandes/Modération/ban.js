const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "Ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à bannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du banissement",
            required: false,
            autocomplete: false
        }, {
            type: "boolean",
            name: "notif",
            description: "Si il doit y avoir un MP envoyé au banni",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        try{

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Pas de membre à bannir")
            let member = message.guild.members.cache.get(user.id)

            let reason =  args.get("raison")
            if(!reason) reason = "Pas de raison fournie."
            
            if (message.user.id === user.id) return message.reply("T'es débile mon reuf ! Te ban pas tout seul...")
            if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Il est trop puissant...")
            if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir cette personne.")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà ban.")

            let notify = args.get("notif")
            if(!notify) notify = false
            if(notify.value) {try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}}
            

            await message.reply(`${message.user} a banni ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {

            return message.reply("Pas de membre à bannir")
        }
    }
}