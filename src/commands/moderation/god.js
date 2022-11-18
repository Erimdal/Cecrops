const {Command} = require('@sapphire/framework');

const {envConfig, commandsParameters} = require('../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('god');

module.exports = class GodCommand extends Command {
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
                guildIds: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        let gods = interaction.guild.roles.cache.find(role => role.name === 'Dieux');
        let strategists = interaction.guild.roles.cache.find(role => role.name === 'Stratèges');
        let member = interaction.member;

        if (member.roles.cache.has(gods.id)) {
            member.roles.remove(gods).catch(console.error);
            await interaction.reply('Welcome back to the human realm.');
        }
        else if (member.roles.cache.has(strategists.id)) {
            member.roles.add(gods).catch(console.error);
            await interaction.reply('Welcome to Mount Olympus!');
        }
        else {
            await interaction.reply('You have not gained the right to be a god in this place.');
        }
    }
};