const {Command} = require('@sapphire/framework');

const {retrieveUser, minimumBet, addExperience} = require('../../../utility/gambling');

const {notEnoughBet, notEnoughCredits, levelUpEmbed, valueNotExisting, winningCoinflipEmbed, winningNumberEmbed, losingCoinflipEmbed, losingNumberEmbed} = require('../../../../parameters/embeds/rouletteEmbed');

const {envConfig, commandsParameters, getOption, getSubcommand} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('roulette');
const valueSubcommandParameters = getSubcommand(commandParameters, 'value');
const colorSubcommandParameters = getSubcommand(commandParameters, 'color');

module.exports = class RouletteCommand extends Command {
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
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName(valueSubcommandParameters.name)
                            .setDescription(valueSubcommandParameters.description)
                            .addNumberOption(option =>
                                option
                                    .setName(getOption(valueSubcommandParameters, 'bet').name)
                                    .setDescription(getOption(valueSubcommandParameters, 'bet').description)
                                    .setRequired(getOption(valueSubcommandParameters, 'bet').required),
                            )
                            .addNumberOption(option =>
                                option
                                    .setName(getOption(valueSubcommandParameters, 'value').name)
                                    .setDescription(getOption(valueSubcommandParameters, 'value').description)
                                    .setRequired(getOption(valueSubcommandParameters, 'value').required),
                            ),
                    )
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName(colorSubcommandParameters.name)
                            .setDescription(colorSubcommandParameters.description)
                            .addNumberOption(option =>
                                option
                                    .setName(getOption(colorSubcommandParameters, 'bet').name)
                                    .setDescription(getOption(colorSubcommandParameters, 'bet').description)
                                    .setRequired(getOption(colorSubcommandParameters, 'bet').required),
                            )
                            .addStringOption(option =>
                                option
                                    .setName(getOption(colorSubcommandParameters, 'value').name)
                                    .setDescription(getOption(colorSubcommandParameters, 'value').description)
                                    .setRequired(getOption(colorSubcommandParameters, 'value').required)
                                    .setChoices(...getOption(colorSubcommandParameters, 'value').choices),
                            ),
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

        /**
         * @param colorMode if true -> color mode, if false -> value mode
         */
        const colorMode = interaction.options.getSubcommand() === getSubcommand(commandParameters, 'color').name;

        // Test of parameters validity
        if (colorMode ? !([ 'black', 'red' ].includes(interaction.options.getString(getOption(colorSubcommandParameters, 'value').name))) : !(0 <= interaction.options.getNumber(getOption(valueSubcommandParameters, 'value').name) <= 36)) {
            await interaction.reply({embeds: [valueNotExisting()]});
            return;
        }

        const bet = colorMode ? interaction.options.getNumber(getOption(colorSubcommandParameters, 'bet').name) : interaction.options.getNumber(getOption(valueSubcommandParameters, 'bet').name);

        if (bet > user.credits) {
            await interaction.reply({embeds: [notEnoughCredits(user.credits)]});
            return;
        }

        if (bet < minimumBet(user.credits)) {
            await interaction.reply({embeds: [notEnoughBet(minimumBet(user.credits), user.credits)]});
            return;
        }

        const experienceAdded = 150;

        const newLevel = await addExperience(clientId, experienceAdded);

        if (colorMode) {
            const userColor = interaction.options.getString(getOption(colorSubcommandParameters, 'value').name);
            const botValue = Math.round(Math.random() * 37) - 1; //TODO: refaire les maths ici
            const botColor = 5;//TODO

            if (userColor === botColor) {
                await modifyUserCredits(clientId, bet);

                if (newLevel === user.level) {
                    await interaction.reply({embeds: [winningCoinflipEmbed(user.name, userColor === 'black', userValue, profit, user.credits, experienceAdded)]});
                }
                else {
                    await interaction.reply({embeds: [winningCoinflipEmbed(user.name, botValue, userValue, profit, user.credits, experienceAdded), levelUpEmbed(newLevel)]});
                }
            }
            else {
                await modifyUserCredits(clientId, - bet);

                if (newLevel === user.level) {
                    await interaction.reply({embeds: [winningEmbed(user.name, botValue, userValue, profit, user.credits, experienceAdded)]});
                }
                else {
                    await interaction.reply({embeds: [winningEmbed(user.name, botValue, userValue, profit, user.credits, experienceAdded), levelUpEmbed(newLevel)]});
                }
            }
        }
        else {
            const userValue = interaction.options.getNumber(getOption(valueSubcommandParameters, 'value').name);
        }
    }
};
