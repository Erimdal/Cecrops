const {Command} = require('@sapphire/framework');

const {retrieveUser} = require('../../../utility/gambling');

const {profileEmbed} = require('../../../../parameters/embeds/profileEmbed');

const {envConfig, commandsParameters} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('profile');

module.exports = class ProfileCommand extends Command {
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
        const clientId = parseInt(interaction.user.id);
        const name = interaction.user.username;

        const user = await retrieveUser(name, clientId);

        const minimumBet = Math.max(Math.round(user.credits * 0.05), 100);
        const experienceToNextLevel = user.experience - Math.floor((user.level / 0.12) ** 2);
        const experienceNeededToNextLevel = Math.floor(((user.level + 1) / 0.12) ** 2) - Math.floor((user.level / 0.12) ** 2);

        await interaction.reply({embeds: [profileEmbed(user.name, user.level, user.credits, minimumBet, experienceToNextLevel, experienceNeededToNextLevel, user.experience)]});
    }
};
