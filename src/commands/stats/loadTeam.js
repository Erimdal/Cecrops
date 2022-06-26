const {Command} = require('@sapphire/framework');

const team = require('./team.json');
const colors = require('../../../parameters/colors.json');

const {envConfig, commandsParameters} = require('../../utility/basicImportations');
const { MessageEmbed } = require('discord.js');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('loadTeam');

module.exports = class LoadTeamCommand extends Command {
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
                    .setDescription(commandParameters.description),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const embeds = new Array();

        team.forEach((player) => {
            const embed = new MessageEmbed();
            embed.setTitle(player.name);
            if (player.startingPlayer) {
                embed.setColor(colors.win);
            } else {
                embed.setColor(colors.loss);
            }

            embed.addField(player.role, player.leagueOfGraphs);
            embed.addField(player.csPerMinutes + ' CS par minutes', player.commentary);

            player.champions.forEach((champion) => {
                let i = 2;

                embed.addField(champion.name, champion.commentary, true);

                if (champion.main) {
                    embed.addField('MAIN !', '\u200B', true);
                    i -= 1;
                }
                if (champion.playedByLeDirectoire) {
                    embed.addField('Joué chez nous.', '\u200B', true);
                    i -= 1;
                }
                if (champion.toWatch) {
                    embed.addField('DANGER !', '\u200B', true);
                    if (i == 0) {
                        i += 2;
                    }
                    else {
                        i -= 1;
                    }
                }
                for (i; i > 0; i--) {
                    embed.addField('\u200B', '\u200B', true);
                }
            });

            embeds.push(embed);
        })

        await interaction.reply({embeds: embeds});
    }
};
