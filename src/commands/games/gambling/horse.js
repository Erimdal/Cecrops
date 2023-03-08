const {Command} = require('@sapphire/framework');

const {setTimeout} = require('timers/promises');

const {retrieveUser, modifyUserCredits, addExperience, minimumBet} = require('../../../utility/gambling');
const keepOneZeroOnly = require('../../../utility/keepOneZeroOnly');

const {horseNotExisting, notEnoughCredits, notEnoughBet, gamePlayingEmbed, levelUpEmbed, winningEmbed, losingEmbed} = require('../../../../parameters/gambling/embeds/horseEmbed');

const {envConfig, commandsParameters, getOption} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('horse');

module.exports = class HorseCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: commandParameters.name,
            description: commandParameters.description,
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName(commandParameters.name)
                    .setDescription(commandParameters.description)
                    .addIntegerOption(option =>
                        option
                            .setName(getOption(commandParameters, 'horse').name)
                            .setDescription(getOption(commandParameters, 'horse').description)
                            .setRequired(getOption(commandParameters, 'horse').required),
                    )
                    .addIntegerOption(option =>
                        option
                            .setName(getOption(commandParameters, 'bet').name)
                            .setDescription(getOption(commandParameters, 'bet').description)
                            .setRequired(getOption(commandParameters, 'bet').required),
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

        const bet = interaction.options.getInteger(getOption(commandParameters, 'bet').name);
        const horseChoosen = interaction.options.getInteger(getOption(commandParameters, 'horse').name);

        if (horseChoosen < 1 || horseChoosen > 5) {
            await interaction.reply({embeds: [horseNotExisting()]});
            return;
        }

        if (bet > user.credits) {
            await interaction.reply({embeds: [notEnoughCredits(user.credits)]});
            return;
        }

        if (bet < minimumBet(user.credits)) {
            await interaction.reply({embeds: [notEnoughBet(minimumBet(user.credits), user.credits)]});
            return;
        }

        let results = Array(5).fill(5);

        await interaction.reply({embeds: [gamePlayingEmbed(user.name, results)]});

        while (!results.includes(0)) {
            results = results.map((value) => {
                if (Math.random() < 0.44) {
                    value -= 1;
                }
                return value;
            });

            results = keepOneZeroOnly(results);

            await setTimeout(1000);

            await interaction.editReply({embeds: [gamePlayingEmbed(user.name, results)]});
        }

        const winningHorse = results.indexOf(0) + 1;

        const experienceAdded = 150;

        const newLevel = await addExperience(clientId, experienceAdded);

        if (horseChoosen === winningHorse) {
            await modifyUserCredits(clientId, 4 * bet);

            if (newLevel === user.level) {
                await interaction.followUp({embeds: [winningEmbed(user.name, bet, experienceAdded, winningHorse)]});
            }
            else {
                await interaction.followUp({embeds: [winningEmbed(user.name, bet, experienceAdded, winningHorse), levelUpEmbed(newLevel)]});
            }
        }
        else {
            await modifyUserCredits(clientId, -bet);

            if (newLevel === user.level) {
                await interaction.followUp({embeds: [losingEmbed(user.name, bet, experienceAdded, winningHorse, horseChoosen)]});
            }
            else {
                await interaction.followUp({embeds: [losingEmbed(user.name, bet, experienceAdded, winningHorse, horseChoosen), levelUpEmbed(newLevel)]});
            }
        }
    }
};
