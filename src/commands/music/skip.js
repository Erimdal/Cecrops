const {Command} = require('@sapphire/framework');

const ytdl = require(`ytdl-core`);

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

module.exports = class SkipCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'skip',
            description: 'Passe la musique en cours et si un argument est spécifié, se rend à une musique plus lointaine',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('skip')
                    .setDescription('Passe la musique en cours et si un argument est spécifié, se rend à une musique plus lointaine')
                    .addNumberOption(option =>
                        option
                            .setName('index')
                            .setDescription('Le nombre de musioques à passer.')
                            .setRequired(false),
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

        const index = (interaction.getNumberOption('index') ? interaction.getNumberOption('index') : 1) - 1;

        if (!server.queue[index]) {
            if (index == 0) {
                server.currentVideo = {title: 'Rien pour le moment', url: ''};
                server.dispatcher.pause();
                server.dispatcher = null;
                server.connection = null;
                return await interaction.reply('Rien à jouer après ce morceau.');
            }
            return await interaction.reply('Rien dans la file d\'attente.');
        }

        server.currentVideo = server.queue[index];

        server.dispatcher = server.connection.play(await ytdl(server.currentVideo.url, {filter: 'audioonly'}));
        server.queue.splice(0, index + 1);

        if (index == 0) {
            return await interaction.reply('Musique passée.');
        }
        else {
            return await interaction.reply('Plusieurs musiques ont été passées.');
        }
    }
};