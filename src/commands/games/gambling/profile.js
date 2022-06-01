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

        const user = retrieveUser(name, clientId);

        const embed = new MessageEmbed()
            .setColor('#ee6618')
            .setTitle(`Profil de ${user.name}`)
            .addFields([
                {name: 'Niveau', value: `Vous êtes au niveau ${user.level}`, inline: true},
                {name: 'Expérience / Prochain niveau', value: 'TODO', inline: true},
                {name: 'Mise minimale', value: `${user.credits}`, inline: true},
                {name: 'Progression', value: 'TODO', inline: true},
                {name: 'Total d\'expérience', value: `${user.experience}`, inline: true},
            ]);

        await interaction.reply({embeds: [embed]});
    }
};