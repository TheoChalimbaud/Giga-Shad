const Discord = require("discord.js");

module.exports = {

    name: "lolprofile",
    description: "Affiche le profil d'un joueur",
    permission: "Aucune",
    dm: true,
    category: "League of Legends",
    options: [
        {
            type: "string",
            name: "joueur",
            description: "Le pseudo+tag du joueur",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        const player = args.getString("joueur");
        
        try {
            // Utilisation de la fonction getPUUID
            const PUUID = await bot.function.getLolPUUID(player);
            const accountInfo = await bot.function.getLolAccount(PUUID);
            const lastLolVersion = await bot.function.getLolLastVersion();
            const iconLink = `https://ddragon.leagueoflegends.com/cdn/${lastLolVersion}/img/profileicon/${accountInfo.profileIconId}.png`;
            const {soloQueue, flexQueue} = await bot.function.getLolRanks(accountInfo.accountId);//[tier, rank, leaguePoints, wins, losses, veteran, inactive, freshBlood,hotStreak]
            console.log(soloQueue, flexQueue);

            const masteries = await bot.function.getLolTopMastery(3, PUUID); //[championId, championLevel, championPoints, championName]

            const rankEmoji = {IRON : "<:LolIron:1236861569204490293>", BRONZE : "<:LolBronze:1235322940237807787>", SILVER : "<:LolSilver:1235322939436699740>",
                GOLD :"<:LolGold:1235322938291650630>", PLATINIUM :"<:LolPlatinum:1235322936768987248>", EMERALD :"<:LolEmerald:1235323539020709929>",
                DIAMOND:"<:LolDiamond:1235322935686729742>", MASTER:"<:LolMaster:1235322934864773150>", GRANDMASTER:"<:LolGrandMaster:1235322933778452520>", 
                CHALLENGER:"<:LolChallenger:1235322941726523453>", UNRANKED : "<:LolUnrank:1239761563498451054>"
            };

            let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Profile LoL de ${player} :`)
                .setThumbnail(iconLink)
                .setDescription(`__**Ranks :**__\nSolo/Duo : ${rankEmoji[soloQueue[0].tier]} ${soloQueue[0].tier} ${soloQueue[0].rank} ${soloQueue[0].leaguePoints} lp\nFlex : ${rankEmoji[flexQueue[0].tier]} ${flexQueue[0].tier} ${flexQueue[0].rank} ${flexQueue[0].leaguePoints} lp
                
                __**Top 3 Maîtrises :**__\n${masteries[0].championName} - ${masteries[0].championPoints} pts\n${masteries[1].championName} - ${masteries[1].championPoints} pts\n${masteries[2].championName} - ${masteries[2].championPoints} pts`)
                .setTimestamp()
                .setFooter({text : "/lolprofile"});

            await message.reply({embeds: [Embed]})
        } catch (error) {
            message.reply(error);
        }
    }
    
};