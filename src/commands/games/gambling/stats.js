const {Command} = require('@sapphire/framework');

const {retrieveUser} = require('../../../utility/gambling');

const {statsEmbed} = require('../../../../parameters/embeds/statsEmbed');

const {envConfig, commandsParameters} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('stats');

module.exports = class StatsCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: commandParameters.name,
            description: commandParameters.description,
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName(commandParameters.name)
                    .setDescription(commandParameters.description),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const clientId = parseInt(interaction.user.id);
        const name = interaction.user.username;

        const user = await retrieveUser(name, clientId);

        await interaction.reply({embeds: [statsEmbed(user.name, user.statistics)]});
    }
};
