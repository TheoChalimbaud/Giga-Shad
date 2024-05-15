const Discord = require("discord.js")

module.exports = {

    name: "suggest",
    description: "Faire une suggestion pour le bot",
    permission: "Aucune",
    dm: true,
    category: "Fun",
    options: [
        {
            type: "string",
            name: "suggestion",
            description: "Votre suggestion",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        
        suggestion = args.getString("suggestion");
        author = message.user.tag;
        const channel = bot.channels.cache.find(channel => channel.id === "1074090019423272962");

        if (suggestion === "") return message.reply({content:`N'envoyez pas une suggestion vide...`,ephemeral:true});

        message.reply({content:`Suggestion envoyée !`, ephemeral:true});
        channel.send(`**${author} a envoyé la suggestion :**\n"${suggestion}"`);
    }
}

// id salon suggestion : 1074090019423272962