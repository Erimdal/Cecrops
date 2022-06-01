const {Command} = require('@sapphire/framework');
const {MessageEmbed} = require('discord.js');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const retrieveUser = require('../../../utility/retrieveUser');
const modifyUserCredits = require('../../../utility/modifyUserCredits');

module.exports = class ProfileCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'lower',
            description: 'Jouer à lower',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('lower')
                    .setDescription('Jouer à lower')
                    .addNumberOption(option =>
                        option
                            .setName('pari')
                            .setDescription('Valeur, entre 1 et 99, sur laquelle vous pariez')
                            .setRequired(true),
                    )
                    .addNumberOption(option =>
                        option
                            .setName('enjeu')
                            .setDescription('Montant à parier')
                            .setRequired(true),
                    ),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const clientId = parseInt(interaction.user.id);
        const name = interaction.user.username;

        const user = await retrieveUser(name, clientId);

        const bet = interaction.options.getNumber('enjeu');
        const userValue = interaction.options.getNumber('pari');

        if (userValue > 99 || userValue < 1) {
            await interaction.reply('La valeur que vous proposez doit être entre 1 et 99.');
            return;
        }

        if (bet > user.credits) {
            await interaction.reply('Vous n\'avez pas assez de crédits pour faire ce pari.');
            return;
        }

        if (bet < Math.max(Math.round(user.credits * 0.05), 100)) {
            await interaction.reply('Vous devez parier au moins ' + (Math.max(Math.round(user.credits * 0.05), 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.');
            return;
        }

        const botValue = Math.round(Math.random() * 99);

        if (userValue > botValue) {
            await modifyUserCredits(clientId, Math.round((50 / userValue) * bet));

            const winningEmbed = new MessageEmbed()
                .setColor('#0cf021')
                .setTitle(`Résultats du lower | ${user.name}`)
                .addFields([
                    {name: 'Vous remportez le pari !', value: `Cecrops a tiré ${botValue}.`, inline: true},
                    {name: 'Gain', value: Math.round((50 / userValue) * bet).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' crédits.', inline: true},
                    {name: 'Crédits', value: 'Vous avez ' + (user.credits + Math.round((50 / userValue) * bet)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +  ' crédits.'},
                ]);

            await interaction.reply({embeds: [winningEmbed]});
        }
        else {
            await modifyUserCredits(clientId, - bet);

            const losingEmbed = new MessageEmbed()
                .setColor('#f00c0c')
                .setTitle(`Résultats du lower | ${user.name}`)
                .addFields([
                    {name: 'Vous perdez le pari !', value: `Cecrops a tiré ${botValue}.`, inline: true},
                    {name: 'Perte', value: bet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' crédits.', inline: true},
                    {name: 'Crédits', value: 'Vous avez ' + (user.credits - bet).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' crédits.'},
                ]);

            await interaction.reply({embeds: [losingEmbed]});
        }
    }
};