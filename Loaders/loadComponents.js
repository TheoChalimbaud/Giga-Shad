const { readdirSync } = require('fs');

module.exports = async bot => {

    bot.loadComponents = async () => {

        const componentFolders = readdirSync(`./Components`);
        for (const dossier of componentFolders) {
            const componentFiles = readdirSync(`./Components/${folder}`).filter(
                (file) => file.endsWith('.js')
            );

            const { buttons } = bot;

            switch (folder) {
                case "buttons":
                    for (const file of componentFiles) {
                        const button = require(`../../Components/${folder}/${file}`);
                        buttons.set(button.data.name, button);
                    }
                    break;

                    default: break;
            }
        }
    }
}
