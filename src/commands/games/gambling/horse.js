const {Command} = require('@sapphire/framework');
const {MessageEmbed} = require('discord.js');
const {setTimeout} = require('timers/promises');

const {retrieveUser, modifyUserCredits, addExperience} = require('../../../utility/gambling');

const {envConfig, commandsParameters} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('horse');

/**
 * @function
 * @param {Array<number>} array
 * @returns {Array<number>}
 */
function keepOneZeroOnly(array) {
    if (array.includes(0)) {
        const randomExploration = Array.from(Array(array.length), (_, index) => index + 1).sort(() => Math.random() - 0.5);
        console.log(randomExploration);
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
            name: commandParameters.commandName,
            description: commandParameters.commandDescription,
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName(commandParameters.commandName)
                    .setDescription(commandParameters.commandDescription)
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

            await setTimeout(1000);

            await interaction.editReply({embeds: [getNewEmbed(interaction, results)]});
        }

        const winningHorse = results.indexOf(0) + 1;

        const newLevel = await addExperience(clientId, 150);
        const experienceAdded = 150;

        const optionalEmbed = new MessageEmbed()
            .setColor('#0cf021')
            .setTitle('Level up !')
            .addField(`Niveau ${newLevel} atteint !`, 'Félicitations !');

        if (horseChoosen === winningHorse) {
            await modifyUserCredits(clientId, 4 * bet);

            const winningEmbed = new MessageEmbed()
                .setColor('#0cf021')
                .setTitle(`Résultats du horse | ${user.name}`)
                .addFields([
                    {name: 'Vous remportez le pari !', value: 'Félicitations !', inline: false},
                    {name: `Le cheval ${winningHorse} a gagné !`, value: 'Vous remportez ' + (bet * 4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' crédits.'},
                ])
                .setFooter({text: '+ ' + experienceAdded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'XP'});

            if (newLevel === user.level) {
                await interaction.followUp({embeds: [winningEmbed]});
            }
            else {
                await interaction.followUp({embeds: [winningEmbed, optionalEmbed]});
            }
        }
        else {
            await modifyUserCredits(clientId, -bet);

            const losingEmbed = new MessageEmbed()
                .setColor('#f00c0c')
                .setTitle(`Résultats du horse | ${user.name}`)
                .addFields([
                    {name: 'Vous perdez le pari !', value: `Vous aviez misé sur le cheval ${horseChoosen}`, inline: false},
                    {name: `Le cheval ${winningHorse} a gagné !`, value: 'Vous perdez ' + bet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' crédits.'},
                ])
                .setFooter({text: '+ ' + experienceAdded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'XP'});

            if (newLevel === user.level) {
                await interaction.followUp({embeds: [losingEmbed]});
            }
            else {
                await interaction.followUp({embeds: [losingEmbed, optionalEmbed]});
            }
        }
    }
};