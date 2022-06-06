const {Command} = require('@sapphire/framework');
const {MessageEmbed} = require('discord.js');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const retrieveUser = require('../../../utility/gambling/retrieveUser');
const addExperience = require('../../../utility/gambling/addExperience');

/**
 *
 * @param {Array<Int>} results
 * @returns {MessageEmbed}
 */
function getNewEmbed(interaction, results) {
    return new MessageEmbed()
        .setColor('#ee6618')
        .setTitle(`Course de ${interaction.user.username}`)
        .addFields([
            {name: ':checkered_flag:' + '- '.repeat(results[0]) + ':horse_racing: 1.', value: '\u200b', inline: false},
            {name: ':checkered_flag:' + '- '.repeat(results[1]) + ':horse_racing: 2.', value: '\u200b', inline: false},
            {name: ':checkered_flag:' + '- '.repeat(results[2]) + ':horse_racing: 3.', value: '\u200b', inline: false},
            {name: ':checkered_flag:' + '- '.repeat(results[3]) + ':horse_racing: 4.', value: '\u200b', inline: false},
            {name: ':checkered_flag:' + '- '.repeat(results[4]) + ':horse_racing: 5.', value: '\u200b', inline: false},
        ]);
}

/**
 *
 * @param {Array<Int>} array
 */
function keepOneZeroOnly(array) {
    if (array.includes(0)) {
        const randomExploration = [...Array.from(Array(array.length).keys)].sort(() => Math.random() - 0.5);
        let foundZero = false;

        randomExploration.forEach((value) => {
            if (array[value] === 0 && foundZero) {
                array[value] = 1;
            }
            else if (array[value] === 0) {
                foundZero = true;
            }
        });
    }
    return array;
}

module.exports = class HorseCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'horse',
            description: 'Joue une course de chevaux',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('horse')
                    .setDescription('Joue une course de chevaux')
                    .addNumberOption(option =>
                        option
                            .setName('cheval')
                            .setDescription('Le cheval sur lequel vous voulez parier, de 1 à 5')
                            .setRequired(true),
                    )
                    .addNumberOption(option =>
                        option
                            .setName('enjeu')
                            .setDescription('Votre mise')
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
        const horseChoosen = interaction.options.getNumber('cheval');

        if (horseChoosen > 5 || horseChoosen < 1) {
            await interaction.reply('Vous devez choisir un cheval dont le numéro existe (1 à 5 uniquement)');
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

        let results = [5, 5, 5, 5, 5];

        await interaction.reply({embeds: [getNewEmbed(interaction, results)]});

        while (!results.includes(0)) {
            results = results.map((value) => {
                if (Math.random() < 0.44) {
                    value -= 1;
                }
                return value;
            });

            results = keepOneZeroOnly(results);

            await interaction.editReply({embeds: [getNewEmbed(interaction, results)]});
        }

        const winningHorse = results.indexOf(0) + 1;

        const newLevel = await addExperience(clientId, 150);
        const experienceAdded = Math.round((50 / userValue) * 100);

        const optionalEmbed = new MessageEmbed()
            .setColor('#0cf021')
            .setTitle('Level up !')
            .addField(`Niveau ${newLevel} atteint !`, 'Félicitations !');

        if (horseChoosen === winningHorse) {
            await modifyUserCredits(clientId, 4 * bet);

            const winningEmbed = new MessageEmbed()
                .setColor('#0cf021')
                .setTitle(`Résultats du lower | ${user.name}`)
                .addFields([
                    {name: 'Vous remportez le pari !', value: 'Félicitations !', inline: false},
                    {name: `Le cheval ${winningHorse} a gagné !`, value: 'Vous remportez ' + (bet * 4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' crédits.'},
                ])
                .setFooter({text: '+ ' + experienceAdded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'XP'});

            if (newLevel === user.level) {
                await interaction.addReply({embeds: [winningEmbed]});
            }
            else {
                await interaction.addReply({embeds: [winningEmbed, optionalEmbed]});
            }
        }
        else {
            await modifyUserCredits(clientId, -bet);

            const losingEmbed = new MessageEmbed()
                .setColor('#f00c0c')
                .setName(`Résultats du horse | ${user.name}`)
                .addFields([
                    {name: 'Vous perdez le pari !', value: `Vous aviez misé sur le cheval ${horseChoosen}`, inline: false},
                    {name: `Le cheval ${winningHorse} a gagné !`, value: 'Vous perdez ' + bet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' crédits.'},
                ])
                .setFooter({text: '+ ' + experienceAdded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'XP'});

            if (newLevel === user.level) {
                await interaction.addReply({embeds: [losingEmbed]});
            }
            else {
                await interaction.addReply({embeds: [losingEmbed, optionalEmbed]});
            }
        }
    }
};