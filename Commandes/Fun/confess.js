const Discord = require("discord.js")

module.exports = {

    name: "confess",
    description: "Écrivez ou lisez une confession anonymement d'un autre utilisateur",
    permission: "Aucune",
    dm: true,
    category: "Fun",
    options: [
        {
            type: "string",
            name: "choix",
            description: "Si vous voulez écrire ou lire une confession",
            required: true,
            autocomplete: true
        }, {
            type: "string",
            name: "confession",
            description: "Écrivez votre confession",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {
        
        let confession;
        let conf = args.getString("confession");
        let choix = args.getString("choix");
        if (!choix) return message.reply({content:"Merci de choisir ce que vous voulez faire (Lire ou écrire).", ephemeral: true});
        if (choix === "écrire" && !conf) return message.reply({content:`Merci d'écrire votre confession si vous séléctionnez "écrire".`, ephemeral: true});
        if (choix === "lire" && conf) return message.reply({content:`Il ne faut pas écrire de confession si vous séléctionnez "lire"...`, ephemeral: true});

        if (choix === "lire" && !conf) {

            let result = await new Promise((resolve, reject) => {
                db.query(`SELECT confess FROM confession ORDER BY RAND() LIMIT 1`, (err, req) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(req);
                    }
                });
            });

            if (result.length === 0) {
                return message.reply({content:"Il n'y a pas encore de confessions dans ma base de données. Sois le premier à m'en écrire une pour la partager anonymement !", ephemeral: true});
            }

            confession = result[0].confess;

            await message.reply(`__Confession anonyme écrite par un utilisateur :__\n"${confession}"`);

        } else {
            
            const channel = bot.channels.cache.find(channel => channel.id === "1080146667183026287");
            channel.send(`**Confession anonyme envoyée :**\n"${conf}"`);
            await message.reply({content:`Votre confession a correctement été instauré dans ma base de données, de manière anonyme.`, ephemeral: true})
        }
    }
}