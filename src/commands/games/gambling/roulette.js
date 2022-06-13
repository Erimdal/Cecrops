const {Command} = require('@sapphire/framework');

const {retrieveUser, minimumBet} = require('../../../utility/gambling');

const {notEnoughBet, notEnoughCredits, levelUpEmbed, valueNotExisting, winningCoinflipEmbed, winningNumberEmbed, losingCoinflipEmbed, losingNumberEmbed} = require('../../../../parameters/embeds/rouletteEmbed');

const {envConfig, commandsParameters, getOption, subcommandParameters} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('roulette');
const valueSubcommandParameters = subcommandParameters(commandParameters, 'value');
const colorSubcommandParameters = subcommandParameters(commandParameters, 'color');

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
                            .setName(getSubcommand(commandParameters, 'value').name)
                            .setDescription(getSubcommand(commandParameters, 'value').description)
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
                    )
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName(getSubcommand(commandParameters, 'color').name)
                            .setDescription(getSubcommand(commandParameters, 'color').description)
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
        const userValue = interaction.options.getString(getOption(commandParameters, 'value').name);
        const subcommand = interaction.options.getSubcommand();

        if (bet > user.credits) {
            await interaction.reply({embeds: [notEnoughCredits(user.credits)]});
            return;
        }

        if (bet < minimumBet(user.credits)) {
            await interaction.reply({embeds: [notEnoughBet(minimumBet(user.credits), user.credits)]});
            return;
        }
    }
};
