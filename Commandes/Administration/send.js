const Discord = require("discord.js")

module.exports = {

    name: "message",
    description: "Le bot va écrire le message que vous voulez dans un salon",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "string",
            name: "message",
            description: "Le message que le bot doit écrire",
            required: true,
            autocomplete: false
        },{
            type: "channel",
            name: "salon",
            description: "Le salon où envoyer le message",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        
        let msg = args.getString("message");
        let channel = args.getChannel("salon");

        if (!message) return message.reply("Il faut me donner le message à écrire !")
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon !")

        message.reply({content: "Commande prise en compte.", ephemeral: true})
        await channel.send(`${msg}`);
    }
}