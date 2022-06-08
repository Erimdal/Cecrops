const {Command} = require('@sapphire/framework');

const {retrieveUser, modifyUserCredits, addExperience, minimumBet} = require('../../../utility/gambling');

const {notEnoughBet, notEnoughCredits, valueNotExisting, levelUpEmbed, winningEmbed, losingEmbed} = require('../../../../parameters/embeds/lowerEmbed');

const {envConfig, commandsParameters, getOption} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('lower');

module.exports = class LowerCommand extends Command {
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
                    .addNumberOption(option =>
                        option
                            .setName(getOption(commandParameters, 'bet').name)
                            .setDescription(getOption(commandParameters, 'bet').description)
                            .setRequired(getOption(commandParameters, 'bet').required),
                    )
                    .addNumberOption(option =>
                        option
                            .setName(getOption(commandParameters, 'value').name)
                            .setDescription(getOption(commandParameters, 'value').description)
                            .setRequired(getOption(commandParameters, 'value').required),
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

        const bet = interaction.options.getNumber(getOption(commandParameters, 'bet').name);
        const userValue = interaction.options.getNumber(getOption(commandParameters, 'value').name);

        if (userValue < 1 || userValue > 99) {
            await interaction.reply({embeds: [valueNotExisting()]});
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

        const botValue = Math.round(Math.random() * 99);

        const experienceAdded = Math.round((50 / userValue) * 100);

        const newLevel = await addExperience(clientId, experienceAdded);

        if (userValue > botValue) {
            const profit = Math.round((50 / userValue) * bet);

            await modifyUserCredits(clientId, profit);

            if (newLevel === user.level) {
                await interaction.reply({embeds: [winningEmbed(user.name, botValue, userValue, profit, user.credits, experienceAdded)]});
            }
            else {
                await interaction.reply({embeds: [winningEmbed(user.name, botValue, userValue, profit, user.credits, experienceAdded), levelUpEmbed(newLevel)]});
            }
        }
        else {
            await modifyUserCredits(clientId, - bet);

            if (newLevel === user.level) {
                await interaction.reply({embeds: [losingEmbed(user.name, botValue, userValue, bet, user.credits, experienceAdded)]});
            }
            else {
                await interaction.reply({embeds: [losingEmbed(user.name, botValue, userValue, bet, user.credits, experienceAdded), levelUpEmbed(newLevel)]});
            }
        }
    }
};
