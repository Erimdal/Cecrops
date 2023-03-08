const {Command} = require('@sapphire/framework');

const {retrieveUser, experiencePerLevel, experienceToLevel, minimumBet} = require('../../../utility/gambling');

const {profileEmbed} = require('../../../../parameters/gambling/embeds/profileEmbed');

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

        const experienceToNextLevel = user.experience - experienceToLevel(user.level);

        await interaction.reply({embeds: [profileEmbed(user.name, user.level, user.credits, minimumBet(user.credits), experienceToNextLevel, experiencePerLevel(user.level + 1), user.experience)]});
    }
};
