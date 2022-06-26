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
            embed.setTitle(player.name + ' | ' + player.rank);
            if (player.startingPlayer) {
                embed.setColor(colors.win);
            } else {
                embed.setColor(colors.loss);
            }

            embed.addField(player.role, player.leagueOfGraphs);
            embed.addField(player.csPerMinutes + ' CS par minutes', player.commentary);

            player.champions.forEach((champion) => {

                let name = champion.name;

                if (champion.main) {
                    name += ' :orange_heart:';
                }
                if (champion.playedByLeDirectoire) {
                    name += ' :large_blue_diamond:';
                }
                if (champion.toWatch) {
                    name += ' :no_entry:'
                }

                embed.addField(name, champion.commentary);
            });

            embeds.push(embed);
        })

        await interaction.reply({embeds: embeds});
    }
};
