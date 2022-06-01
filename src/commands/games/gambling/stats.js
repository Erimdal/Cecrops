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
            name: 'stats',
            description: 'Affiche les statistiques dans un message embed',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('stats')
                    .setDescription('Affiche les statistiques dans un message embed'),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const clientId = parseInt(interaction.user.id);
        const name = interaction.user.username;

        const user = await retrieveUser(name, clientId);

        let totalProfits = 0;
        let fields = new Array();

        user.statistics.forEach((data) => {
            totalProfits += data.profits;
            fields.push({name: `${data.gameName}`, value: `${data.profits}`, inline: true});
        });

        fields.unshift({name: 'Total', value: `${totalProfits}`, inline: true});

        const embed = new MessageEmbed()
            .setColor('#ee6618')
            .setTitle(`Statistiques pour ${user.name}`)
            .addFields(fields);

        await interaction.reply({embeds: [embed]});
    }
};