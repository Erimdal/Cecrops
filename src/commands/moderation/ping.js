const {Command} = require('@sapphire/framework');

const {envConfig, commandsParameters} = require('../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('ping');

module.exports = class PingCommand extends Command {
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
                guildIds: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        await interaction.reply('Ping?');

        interaction.fetchReply()
            .then((reply) => {
                const content = `Pong from JavaScript! Bot Latency ${Math.round(this.container.client.ws.ping)} ms. API Latency ${(reply.createdTimestamp) - interaction.createdTimestamp} ms.`;

                interaction.editReply(content);
            });
    }
};