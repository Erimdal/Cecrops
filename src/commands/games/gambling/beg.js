const {Command} = require('@sapphire/framework');

const prisma = require('../../../prismaClient');

const retrieveUser = require('../../../utility/gambling/retrieveUser');
const modifyUserCredits = require('../../../utility/gambling/modifyUserCredits');

const alreadyCredits = require('../../../../parameters/embeds/beg/alreadyCredits');
const cannotBegAgainYet = require('../../../../parameters/embeds/beg/cannotBegAgainYet');
const successfullyBegging = require('../../../../parameters/embeds/beg/successfullyBegging');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

module.exports = class BegCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'beg',
            description: 'Mendier quand vous avez 0 crédits. Disponible toutes les heures.',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('beg')
                    .setDescription('Mendier quand vous avez 0 crédits. Disponible toutes les heures.'),
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
            await interaction.reply({embeds: [alreadyCredits(user)]});
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