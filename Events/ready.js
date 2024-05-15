const Discord = require("discord.js")
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")

//
const ping = require('minecraft-server-util'); // module pour ping le serveur Minecraft Java
const serverIP = 'Knite.craft.gg'; // l'adresse IP de votre serveur Minecraft Java
const serverPort = 10011; // le port de votre serveur Minecraft Java
let mcStatusEmbed;
//

module.exports = async bot => {

    bot.db = await loadDatabase()
    bot.db.connect(function (err) {

        if (err) console.log(err)
        console.log("Base de données connectée !")
    })

    await loadSlashCommands(bot)

    // Configurer le profil du bot (status, pdp, bannière...)
    bot.user.setActivity("Black gatos > squids", {type: Discord.ActivityType["Custom"]})
    //bot.user.setBanner("https://i.pinimg.com/originals/0c/64/9a/0c649a17ec1e5f5ca340248b4ef4e4be.gif").catch(err => console)
    //bot.user.setAvatar("https://www.icegif.com/wp-content/uploads/2023/06/icegif-309.gif").catch(err => console)


    //////////////////////////////////////// AUTO STATUS ATERNOS //////////////////////////////////////////////////////////////
    const serveurDS = bot.guilds.cache.get("544493896923742218");

    const channel = bot.channels.cache.find(channel => channel.id === "1087027604906836068");

    /*
    // Démarre la boucle d'actualisation du serveur (temps configurable à la fin du code
    setInterval(async () => {
        try {
            const response = await ping.status(serverIP, serverPort);
            // console.log(response);
            if(parseInt(response.players.max)!=0)
            {
                const version = response.version;
                const players = `${response.players.online}/${response.players.max}`;
    
                // Création de l'embed avec les nouvelles informations
                mcStatusEmbed = new Discord.EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('Serveur en ligne :')
                .addFields(
                {name:'Adresse IP : ', value: `${serverIP}:10011`},
                {name:'Port : ', value: `${serverPort}`},
                {name:'Version : ', value: `${version.name} Forge (115 mods)`},
                {name:'Joueurs en ligne : ', value: players})
                .setThumbnail(serveurDS.iconURL({dynamic:true}))
                .setTimestamp()
                .setFooter({text:bot.user.username, iconURL:bot.user.displayAvatarURL({dynamic:true})});

                // Modifie l'embed du message
                channel.messages.fetch(`1087035684092661820`).then(message => {
                    message.edit({embeds: [mcStatusEmbed]});
                }).catch(err => {
                    console.error(err);
                });
            }

            else {
                mcStatusEmbed = new Discord.EmbedBuilder()
                .setColor('#fc0f03')
                .setTitle('Serveur HORS LIGNE')
                .addFields(
                {name:'Adresse IP : ', value: `Knite.craft.gg`},
                {name:'Port : ', value: `10011`},
                {name:'Version : ', value: `1.12.2 Forge`})
                .setThumbnail(serveurDS.iconURL({dynamic:true}))
                .setTimestamp()
                .setFooter({text:bot.user.username, iconURL:bot.user.displayAvatarURL({dynamic:true})});

                channel.messages.fetch(`1079784589771411536`).then(message => {
                    message.edit({embeds: [mcStatusEmbed]});
                }).catch(err => {
                    console.error(err);
                });
            }
        }
        catch(err) {
            console.error(err);
        };
    }, 30000);
    
    */

    // Message pour être sûr que le bot s'est lancé
    console.log(`${bot.user.tag} est bien en ligne !`)
}