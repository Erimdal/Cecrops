const {Command} = require('@sapphire/framework');

const fs = require('fs');

const {notValidDaysNumberEmbed, offeringListEmbed, singleOfferingEmbed} = require('../../../../parameters/dofus/embeds/almanaxEmbed');

const {envConfig, commandsParameters, getOption, getSubcommand} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('almanax');
const dailySubcommandParameters = getSubcommand(commandParameters, 'daily');
const reviewSubcommandParameters = getSubcommand(commandParameters, 'review');

module.exports = class AlmanaxCommand extends Command {
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
                            .setName(dailySubcommandParameters.name)
                            .setDescription(dailySubcommandParameters.description)
                    )
                    .addSubcommand(subcommand =>
                        subcommand
                            .setName(reviewSubcommandParameters.name)
                            .setDescription(reviewSubcommandParameters.description)
                            .addNumberOption(option =>
                                option
                                    .setName(getOption(reviewSubcommandParameters, 'days').name)
                                    .setDescription(getOption(reviewSubcommandParameters, 'days').description)
                                    .setRequired(getOption(reviewSubcommandParameters, 'days').required),
                            ),
                    ),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const file = JSON.parse(fs.readFileSync('parameters/dofus/almanaxData.json', 'utf-8'));

        if (interaction.options.getSubcommand() === getSubcommand(commandParameters, 'review').name) {
            /*
            Review mode
            */
            let daysRequired = interaction.options.getNumber(getOption(reviewSubcommandParameters, 'days').name);
            let dayExplored = new Date(Date.now());
            dayExplored.setHours(0, 0, 0, 0);

            // Testing the validity of the parameter
            const endOfYear = new Date(new Date(Date.now()).getFullYear(), 12, 31);
            const diffInDays = Math.round((endOfYear.getTime() - new Date(Date.now()).getTime()) / (1000 * 60 * 60 * 24));
            if (daysRequired < 1 || daysRequired > diffInDays) {
                await interaction.reply({embeds: [notValidDaysNumberEmbed()]});
                return;
            }

            let first = true;

            while (daysRequired > 0) {
                let offerings = [];

                for (let i = 0 ; i < 9 ; i++) {
                    for (const offering of file) {
                        if (offering.date === dayExplored.toISOString().split("T")[0]) {
                            offerings.push(offering);
                            continue;
                        }
                    }

                    if (--daysRequired == 0) {
                        continue;
                    }
                    dayExplored.setDate(dayExplored.getDate() + 1);
                }

                if (first) {
                    first = false;
                    await interaction.reply({embeds: [offeringListEmbed(offerings)]});
                } else {
                    await interaction.followUp({embeds: [offeringListEmbed(offerings)]});
                }
            }

        } else {
            /*
            Daily mode
            */
            for (const offering of file) {
                if (offering.date === new Date(Date.now()).toISOString().split("T")[0]) {
                    await interaction.reply({embeds: [singleOfferingEmbed(offering)]});
                    return;
                }
            }
        }
    }
};
