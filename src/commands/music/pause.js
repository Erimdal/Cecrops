const {Command} = require('@sapphire/framework');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

module.exports = class PauseCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'pause',
            description: 'Met en pause la musique',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('pause')
                    .setDescription('Met en pause la musique'),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        if (!interaction.member.voice.channel) {
            return await interaction.reply('Vous n\'êtes pas dans un salon vocal');
        }

        if (!interaction.client.voice.connections.first()) {
            return await interaction.reply('Je ne suis pas dans le salon vocal.');
        }

        if (interaction.client.server.dispatcher) {
            interaction.client.server.dispatcher.pause();

            return await interaction.reply('Musique en pause !');
        }
        else {
            return await interaction.reply('Musique déjà en pause !');
        }
    }
};