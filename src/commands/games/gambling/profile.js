const {Command} = require('@sapphire/framework');
const {MessageEmbed} = require('discord.js');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const retrieveUser = require('../../../utility/retrieveUser');

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

        const embed = new MessageEmbed()
            .setColor('#ee6618')
            .setTitle(`Profil de ${user.name}`)
            .addFields([
                {name: 'Niveau', value: `Vous êtes au niveau ${user.level}`, inline: true},
                {name: 'Mise minimale', value: `${Math.min([(user.credits) * 0.05, 100])}`, inline: true},
                {name: 'Progression', value: 'TODO', inline: false},
                {name: 'Expérience / Prochain niveau', value: `${experienceToNextLevel} / ${experienceNeededToNextLevel}`, inline: false},
                {name: 'Total d\'expérience', value: `${user.experience}`, inline: true},
            ]);

        await interaction.reply({embeds: [embed]});
    }
};