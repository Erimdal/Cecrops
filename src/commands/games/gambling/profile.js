const {Command} = require('@sapphire/framework');
const {MessageEmbed} = require('discord.js');

const retrieveUser = require('../../../utility/gambling/retrieveUser');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

module.exports = class ProfileCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'profile',
            description: 'Affiche le profil de la personne qui lance la commande dans un embed',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('profile')
                    .setDescription('Affiche le profil de la personne qui lance la commande dans un embed'),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const clientId = parseInt(interaction.user.id);
        const name = interaction.user.username;

        const user = await retrieveUser(name, clientId);

        const experienceToNextLevel = user.experience - Math.floor((user.level / 0.12) ** 2);
        const experienceNeededToNextLevel = Math.floor(((user.level + 1) / 0.12) ** 2) - Math.floor((user.level / 0.12) ** 2);
        const percentageOfProgression = Math.round(experienceToNextLevel / experienceNeededToNextLevel * 100);
        const numberOfProgressionTiles = Math.floor(percentageOfProgression / 10);

        const embed = new MessageEmbed()
            .setColor('#ee6618')
            .setTitle(`Profil de ${user.name}`)
            .addFields([
                {name: 'Niveau d\'utilisateur', value: `${user.level}`, inline: true},
                {name: 'Crédits', value: user.credits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), inline: true},
                {name: 'Mise minimale', value: (Math.max((user.credits) * 0.05, 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' crédits', inline: true},
                {name: 'Progression', value: `${percentageOfProgression}% [ ` + '= '.repeat(numberOfProgressionTiles) + '- '.repeat(10 - numberOfProgressionTiles) + ']', inline: true},
                {name: 'Prochain niveau', value: experienceToNextLevel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' / ' + experienceNeededToNextLevel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' XP', inline: true},
                {name: 'Total d\'expérience', value: user.experience.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' XP', inline: true},
            ]);

        await interaction.reply({embeds: [embed]});
    }
};