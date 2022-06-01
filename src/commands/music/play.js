const {Command} = require('@sapphire/framework');

const ytdl = require('ytdl-core');
const ytsr = require('youtube-search');
const ytpl = require('ytpl');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

module.exports = class PlayCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'play',
            description: 'Joue une vidéo depuis l\'URL ou recherche les termes indiqués en arguments',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('play')
                    .setDescription('Joue une vidéo depuis l\'URL ou recherche les termes indiqués en arguments')
                    .addStringOption(option =>
                        option
                            .setName('url')
                            .setDescription('Indiquez ici soit l\'URL de la vidéo Youtube à jouer ou bien des mots-clés permettant de la trouver')
                            .setRequired(false),
                    ),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async runVideo(interaction, connection) {
        const server = interaction.client.server;
        const voiceChannel = interaction.member.voice.channel;

        const dispatcher = connection.play(await ytdl(server.currentVideo.url), {filter: 'audioonly'});

        server.queue.shift();
        server.dispatcher = dispatcher;
        server.connection = connection;

        dispatcher.on('finish', () => {
            if (server.queue[0]) {
                server.currentVideo = server.queue[0];
                this.runVideo(interaction, connection);
            }
            else {
                server.currentVideo = {title: 'Rien pour le moment', url: ''};
                server.dispatcher = null;
                server.connection = null;
                server.queue = [];
                voiceChannel.leave();
            }
        });

        return await interaction.reply(`Je joue dès à présent : ${server.currentVideo.title}`);
    }

    async chatInputRun(interaction) {
        const server = interaction.client.server;
        const voiceChannel = interaction.member.voice.channel;

        const file = JSON.parse(fs.readFileSync('parameters/music.json', 'utf-8'));

        if (!voiceChannel) {
            await interaction.reply('Vous n\'êtes pas dans un salon vocal ! ');
            return;
        }

        const term = interaction.options.getString('play') ? interaction.options.getString('play') : file.url;

        await voiceChannel.join().then((connection) => {
            if (ytpl.validateID(term)) {
                ytpl(term).then(async (playlist) => {
                    playlist.items.forEach((video) => {
                        server.queue.push({title: video.title, url: video.shortUrl});
                    });

                    if (server.currentVideo.url !== '') {
                        return await interaction.reply(`${playlist.items.length} musiques ont été ajoutées à la file d'attente.`);
                    }

                    server.currentVideo = server.queue[0];
                    this.runVideo(interaction, connection).then(async () => {
                        await interaction.reply(`${playlist.items.length} musiques ont été ajoutées à la file d'attente.`);
                    });
                });
            }
            else {
                ytsr(term, {key: process.env.MUSIC_KEY, maxResults: 1, type: 'video'}).then(async (results) => {
                    if (results.results[0]) {
                        const foundVideo = {title: results.results[0].title, url: results.results[0].link};

                        if (server.currentVideo.url !== '') {
                            server.queue.push(foundVideo);
                            return await interaction.reply(`Ajouté la vidéo suivante à la file d'attente : ${foundVideo.title}`);
                        }

                        server.currentVideo = foundVideo;
                        this.runVideo(interaction, connection);
                    }
                });
            }
        });
    }
};