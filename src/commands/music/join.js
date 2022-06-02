const {Command} = require('@sapphire/framework');

const retrieveConnection = require('./utility/retrieveConnection');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

module.exports = class JoinCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'join',
            description: 'Rejoint le salon vocal dans lequel l\'utilisateur se trouve.',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('join')
                    .setDescription('Rejoint le salon vocal dans lequel l\'utilisateur se trouve.'),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return await interaction.reply('Vous n\'êtes pas dans un salon vocal');
        }

        await retrieveConnection(voiceChannel);

        return await interaction.reply(`J'ai bien rejoint ${voiceChannel.name}.`);
    }
};