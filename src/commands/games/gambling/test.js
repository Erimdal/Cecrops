const {Command} = require('@sapphire/framework');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const modifyUserCredits = require('../../../utility/modifyUserCredits');
const retrieveUser = require('../../../utility/retrieveUser');

module.exports = class ProfileCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'test',
            description: 'fait des tests',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('test')
                    .setDescription('fait des tests'),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const clientId = parseInt(interaction.user.id);
        const name = interaction.user.username;

        await modifyUserCredits(clientId, 100);

        const user = await retrieveUser(name, clientId);

        await interaction.reply(`100 ajouté. Nouveau solde : ${user.credits}`);
    }
};