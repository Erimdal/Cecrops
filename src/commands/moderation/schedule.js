const {Command} = require('@sapphire/framework');

const {holidaysScheduleEmbed, normalScheduleEmbed} = require('../../../parameters/moderation/embeds/scheduleEmbed');

const {envConfig, commandsParameters, getOption} = require('../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('schedule');

module.exports = class ScheduleCommand extends Command {
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
                    .addStringOption(option =>
                        option
                            .setName(getOption(commandParameters, 'week').name)
                            .setDescription(getOption(commandParameters, 'week').description)
                            .setRequired(getOption(commandParameters, 'week').required)
                            .addChoices(...getOption(commandParameters, 'week').choices),
                    ),
            {
                guildIds: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const isWeekHoliday = interaction.options.getString(getOption(commandParameters, 'week').name) == "holiday";
        isWeekHoliday ? await interaction.reply({embeds: [holidaysScheduleEmbed(new Date(Date.now()))]}) : await interaction.reply({embeds: [normalScheduleEmbed(new Date(Date.now()))]});
    }
};