const Discord = require("discord.js");
const ttt = require("discord-tictactoe");
const game = new ttt({language:"fr"});

module.exports = {

    name: "morpion",
    description: "Jouer au morpion avec le bot ou un autre joueur",
    permission: "Aucune",
    dm: false,
    category: "Fun",
    options: [
        {
            type: "user",
            name: "adversaire",
            description: "Le membre à affronter",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        
        let membre =  args.get("adversaire");
        if (!membre) {

            membre = null;
            game.handleInteraction(message);
        }else {
            game.handleInteraction(message, membre);
        }
        
    }
}