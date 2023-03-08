const {Command} = require('@sapphire/framework');

// const {embed1, embed2, ...} = require('../../../../parameters/dofus/embeds/functionEmbed');

const {almanaxData} = require('../../../../parameters/dofus/almanaxData.json');

const {envConfig, commandsParameters} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('almanax');

module.exports = class AlmanaxCommand extends Command {
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
    }
};
