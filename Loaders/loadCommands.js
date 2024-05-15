const chalk = require('chalk')
const fs = require('fs');
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Commandes', 'Stats').setBorder('|', '=', "0", "0")

module.exports = bot => {
fs.readdirSync('./Commandes/').forEach(dir => {
const files = fs.readdirSync(`./Commandes/${dir}/`).filter(file => file.endsWith('.js'));
if(!files || files.length <= 0) console.log(chalk.red("Commandes - 0"))
files.forEach((file) => {
 let command = require(`../Commandes/${dir}/${file}`)
                if(command) {
                  bot.commands.set(command.name, command)
                   if(command.aliases && Array.isArray(command.aliases)) {
                        command.aliases.forEach(alias => {
                           bot.aliases.set(alias, command.name)
                           })
                         }
                        table.addRow(command.name, ' ✅')
                        } else {
                                table.addRow(file, '⛔')
                        }
                });
});
  console.log(chalk.blue(table.toString()))
};
