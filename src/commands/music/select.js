const {Command} = require('@sapphire/framework');

const ytdl = require('ytdl-core');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

module.exports = class SelectCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'select',
            description: 'Va chercher une musique plus lointaine, la met en écoute, puis continue le reste',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('select')
                    .setDescription('Va chercher une musique plus lointaine, la met en écoute, puis continue le reste')
                    .addNumberOption(option =>
                        option
                            .setName('index')
                            .setDescription('Le titre auquel se rendre')
                            .setRequired(true),
                    ),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const server = interaction.client.server;

        if (!interaction.member.voice.channel) {
            return await interaction.reply('Vous n\'êtes pas dans un salon vocal');
        }

        if (!interaction.client.voice.connections.first()) {
            return await interaction.reply('Je ne suis pas dans le salon vocal.');
        }

        const index = interaction.getNumberOption('index') - 1;

        if (!server.queue[index]) {
            return await interaction.reply('Rien dans la file d\'attente.');
        }

        server.currentVideo = server.queue[index];

        server.dispatcher = server.connection.play(await ytdl(server.currentVideo.url, {filter: 'audiioonly'}));
        server.queue.splice(index, index + 1);

        return await interaction.reply('Musique correctement sélectionnée dans la file d\'attente. La file d\'attente continuera normalement après ça');
    }
};