const {Command, RegisterBehavior} = require('@sapphire/framework');
const dotenv = require('dotenv');
const fs = require('fs');
const envConfig = dotenv.parse(fs.readFileSync('.env'));

module.exports = class PingCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'ping',
            description: 'Affiche la latence de l\'API et de la connexion à Discord du bot Cecrops.',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('ping')
                    .setDescription('Affiche la latence de l\'API et de la connexion à Discord du bot Cecrops.'),
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