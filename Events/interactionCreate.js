const { messageLink } = require("discord.js")
const Discord = require("discord.js")
const { truncate } = require("fs")

module.exports = async (bot, interaction) => {

    

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

        if (interaction.commandName === "help") {
        
            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }

        if (interaction.commandName === "setcaptcha" || interaction.commandName === "setantiraid") {
        
            let choices = ["ON", "OFF"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c=> ({name: c, value: c})))
        }

        if (interaction.commandName === "confess") {
        
            let choices = ["lire", "écrire"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c=> ({name: c, value: c})))
        }

        if (interaction.commandName === "setstatus") {
        
            let choices = ["Listening", "Watching","Playing","Streaming","Competiting", "Custom"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }
    }   


    if (interaction.type === Discord.InteractionType.ApplicationCommand){

        const command = bot.commands.get(interaction.commandName);
        command.run(bot, interaction, interaction.options, bot.db)
    }

    // LES BOUTONS
    if (interaction.isButton()) {

        if (interaction.customId === "ticket") {

            let channel = await interaction.guild.channels.create({
                name: `ticket ${interaction.user.username}`,
                type: Discord.ChannelType.GuildText
            })

            await channel.setParent(interaction.channel.parent.id)

            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                ViewChannel: false
            })
            await channel.permissionOverwrites.create(interaction.user, {
                ViewChannel: true,
                EmbedLinks:true,
                SendMessages:true,
                AttachFiles:true,
                ReadMessageHistory:true
            })
            

            
            await channel.setTopic("Tu te trouves sur ton ticket, explique le sujet de celui-ci !")
            await interaction.reply({content: `Votre ticket à bien été créé : ${channel}`, ephemeral: true})

            let Embed = new Discord.EmbedBuilder()
            .setColor("#45b6fe")
            .setTitle(`Voici ton ticket ${interaction.user.username} !`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic:true}))
            .setDescription("N'oublie pas de fermer ce ticket une fois ton problème résolu.")
            .setTimestamp()
            .setFooter({text:bot.user.username, iconURL:bot.user.displayAvatarURL({dynamic:true})})

            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("close")
            .setLabel("Fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️"))

            await channel.send({embeds:[Embed], components: [btn]})
        }

        if (interaction.customId === "close") {

            await interaction.channel.delete()
        }
    }


}

