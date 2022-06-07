const {Command} = require('@sapphire/framework');

const prisma = require('../../../prismaClient');

const {retrieveUser, modifyUserCredits} = require('../../../utility/gambling');

const {alreadyCredits, cannotBegAgainYet, successfullyBegging} = require('../../../../parameters/embeds/begEmbed');

const {envConfig, commandsParameters} = require('../../../utility/basicImportations');

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const commandParameters = commandsParameters('beg');

module.exports = class BegCommand extends Command {
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

        if (user.dailyCooldown > new Date(Date.now())) {
            const differenceBetweenDates = user.dailyCooldown - (new Date(Date.now()));
            const minutes = Math.floor(differenceBetweenDates / (1000 * 60));
            const seconds = Math.ceil(((differenceBetweenDates / (1000 * 60)) - Math.floor(differenceBetweenDates / (1000 * 60))) * 60);

            await interaction.reply({embeds: [cannotBegAgainYet(minutes, seconds)]});
            return;
        }

        if (user.credits > 0) {
            await interaction.reply({embeds: [alreadyCredits(user.credits)]});
            return;
        }

        await modifyUserCredits(clientId, 10000);

        await prisma.users.updateMany({
            where: {
                clientId,
            },
            data: {
                dailyCooldown: new Date(Date.now() + (10 * 60 * 1000)),
            },
        });

        await interaction.reply({embeds: [successfullyBegging()]});
    }
};
