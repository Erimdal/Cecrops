const {Command} = require('@sapphire/framework');

const dotenv = require('dotenv');
const fs = require('fs');
const modifyUserCredits = require('../../../utility/modifyUserCredits');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const prisma = require('../../../prismaClient');
const retrieveUser = require('../../../utility/retrieveUser');

module.exports = class ProfileCommand extends Command {
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

        if (!(user.dailyCooldown < new Date(Date.now()))) {
            await interaction.reply('Impossible de mendier maintenant. Réessayez dans une dizaine de minutes.');
            return;
        }

        if (user.credits > 0) {
            await interaction.reply('On ne mendie pas quand on a de l\'argent ! ');
            return;
        }

        await modifyUserCredits(clientId, 10000);

        await prisma.users.updateMany({
            where: {
                clientId,
            },
            data: {
                dailyCooldown: new Date(Date.now() + (60 * 60 * 1000)),
            },
        });

        await interaction.reply('10,000 crédits vous ont été octroyés.');
    }
};