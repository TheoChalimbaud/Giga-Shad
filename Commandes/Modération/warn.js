const Discord = require("discord.js")

module.exports = {

    name: "warn",
    description: "Permet de warn un membre",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à warn",
            required: true,
            autocomplete: false
        },{
            type: "string",
            name: "raison",
            description: "La raison du warn",
            required: false,
            autocomplete: false
        }, {
            type: "boolean",
            name: "notif",
            description: "Si il doit y avoir un MP envoyé au membre warn",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {
        
        let user = args.getUser("membre");
        if(!user) return message.reply("Membre inexistant")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Membre introuvable sur le serveur.")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie.";

        if (message.user.id === user.id) return message.reply("T'es débile mon reuf ! Te warn pas tout seul...")
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Il est trop puissant pour être warn...")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas warn ce membre.")
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Je ne peux pas warn ce membre.")

        let notify = args.get("notif")
        if(!notify) notify = false
        if(notify.value) {try {await user.send(`Tu as été warn du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}}

        await message.reply(`${message.user} a warn ${user.tag} pour la raison : \`${reason}\``)

        let ID = await bot.function.createId("WARN")

        db.query(`INSERT INTO warns (guild, user, author, warnID, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}','${Date.now()}')`)
    }
}