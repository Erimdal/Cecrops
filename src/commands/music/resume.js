const {Command} = require('@sapphire/framework');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

module.exports = class ResumeCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'resume',
            description: 'Redémarre la musique mise en pause',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('resume')
                    .setDescription('Redémarre la musique mise en pause'),
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
            interaction.client.server.dispatcher.resume();
            return await interaction.reply('Musique remise en marche !');
        }
        else {
            return await interaction.reply('La musique est déjà en cours de fonctionnement !');
        }
    }
};