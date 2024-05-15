const Discord = require("discord.js");

module.exports = async (bot, member) => {

    let db = bot.db;

    db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {

        if(req.length < 1) return;
        if(member.user.bot) return;

        if(req[0].antiraid === "true") {

            try {await member.user.send("Vous ne pouvez pas rejoindre le serveur car il est en mode antiraid.")} catch (err) {}
            return await member.kick("Antiraid actif")
        }

        if(Boolean(req[0].captcha)=== "false") return;
        
        let channel = member.guild.channels.cache.get(req[0].captcha);
        if(!channel) return;

        // Perm salon
        await channel.permissionOverwrites.create(member.user, {
            SendMessages: true,
            ViewChannel: true,
            ReadMessageHistory: true
        })

        let captcha = await bot.function.createCaptcha()

        let msg = await channel.send({content:`${member}, vous avez 2 minutes pour compléter le captcha ! Si nous n'y parvenez pas vous serez exclu.`, files: [new Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), {name: "captcha.png"})]})
    

        try {

            let filter = m => m.author.id === member.user.id;
            let response = (await channel.awaitMessages({filter, max:1, time: 120000, errors: ["time"]})).first();

            //Captcha réussi / échoué
            if (response.content === captcha.text) {

                await msg.delete()
                await response.delete();
                await channel.permissionOverwrites.delete(member.user.id)

            } else {

                await msg.delete();
                await response.delete();
                try{await member.user.send("Vous avez raté le captcha. Redemandez une invitation pour rejoindre (t'es pas doué aussi...).")} catch (err) {}
                await channel.permissionOverwrites.delete(member.user.id)
                await member.kick("Captcha raté")
            }

        } catch (err) {

            await msg.delete()
            try{await member.user.send("Vous avez mit trop de temps pour compléter le captcha !")} catch (err) {}
            await channel.permissionOverwrites.delete(member.user.id)
            await member.kick("Captcha non complété")

        }

    })
}