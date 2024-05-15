const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const config = require("./config")

bot.commands = new Discord.Collection()
bot.color = "#ff0000"; 
bot.function = {

    createId: require("./Fonctions/createId"),
    createCaptcha: require("./Fonctions/createCaptcha"),
    // LOL :
    getLolPUUID: require("./Fonctions/getLolPUUID"),
    getLolAccount: require("./Fonctions/getLolAccount"),
    getLolLastVersion: require("./Fonctions/getLolLastVersion"),
    getLolRanks: require("./Fonctions/getLolRanks"),
    getLolTopMastery: require("./Fonctions/getLolTopMastery"),
    getLolChampName: require("./Fonctions/getLolChampName")
}

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)