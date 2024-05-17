const Discord = require("discord.js");

module.exports = async (bot, message) => {
    let db = bot.db;
    if (message.author.bot || message.channel.type === Discord.ChannelType.DM) return;

    try {
        db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {
            if (err) throw err;

            if (req.length < 1) {
                db.query(`INSERT INTO server (guild, captcha, antiraid) VALUES (${message.guild.id}, 'false', 'false')`, (err) => {
                    if (err) throw err;
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
};
