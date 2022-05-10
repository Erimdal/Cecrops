const {Command} = require('@sapphire/framework');

module.exports = class PingCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'ping',
            description: 'ping pong',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName(this.name)
                    .setDescription(this.description),
            {
                guildIds: ['401733788096266240'],
                idHints: ['973596711287128125'],
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