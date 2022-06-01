const {Command} = require('@sapphire/framework');
const { MessageEmbed } = require('discord.js');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

module.exports = class QueueCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'queue',
            description: 'Affiche la file d\attente pour la musique',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('queue')
                    .setDescription('Affiche la file d\'attente pour la musique')
                    .addNumberOption(option =>
                        option
                            .setName('page')
                            .setDescription('La page que vous souhaitez afficher dans la file d\'attente')
                            .setRequired(false),
                    ),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const server = interaction.client.server;

        const file = JSON.parse(fs.readFileSync('parameters/music.json', 'utf-8'));
        const itemsPerPage = file.itemsPerPageInQueue;

        const page = interaction.options.getNumber('page') ? interaction.options.getNumber('page') : 1;

        if (!interaction.member.voice.channel) {
            return await interaction.reply('Vous n\'êtes pas dans un salon vocal');
        }

        if (!interaction.client.voice.connections.first()) {
            return await interaction.reply('Je ne suis pas dans le salon vocal.');
        }

        const startingItem = (page - 1) = itemsPerPage;
        const queueLength = server.queue.length;

        let endingItem = startingItem + itemsPerPage;
        let totalPages = 1;

        let queueEmbed = new MessageEmbed()
            .setTitle(`File d\'attente pour ${interaction.user.username}`)
            .setColor('BLUE')
            .addFields([
                {name: 'En train de jouer : ', value: `[${server.currentVideo.title}](${server.currentVideo.url})`},
                {name: 'À venir : ', value: 'Restez à l\'écoute'},
            ]);

        if (queueLength > 0) {
            if (queueLength > itemsPerPage) {
                totalPages = Math.ceil(queueLength / itemsPerPage);
            }

            if (page <= 0 || page > totalPages) {
                return await interaction.reply('Cette page n\'existe pas');
            }

            if (endingItem > queueLength) {
                endingItem = queueLength;
            }

            for (let i = startingItem; i < endingItem; i++) {
                const video = server.queue[i];
                queueEmbed.addField(`\`${i + 1}.\`[${video.title}](${video.url})`);
            }
        }

        queueEmbed.setFooter({text: `Page ${page}/${totalPages}`});

        return await interaction.reply({embeds: [queueEmbed]});
    }
};