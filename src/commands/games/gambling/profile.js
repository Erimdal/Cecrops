const {Command} = require('@sapphire/framework');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const prisma = require('../../../prismaClient');

module.exports = class ProfileCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'profile',
            description: 'Affiche le profil de la personne concernée dans un message embed.',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('profile')
                    .setDescription('Affiche le profil de la personne concernée dans un message embed.'),
            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }
};