const {Command} = require('@sapphire/framework');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const mongoose = require('mongoose');

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

    async chatInputRun(interaction) {
        const {playerSchema, economicSchema} = require('../../../database/gamblingEconomy');
        const {username, id} = interaction.member.user;

        if (mongoose.connection.model('economy', economicSchema).model('players', playerSchema).TODO:change that({
            name: username,
            id: id,
        }) !== null) {
            console.log('User exists ! That works !');
        }
        else {
            const playerModel = await new playerSchema({
                id: id,
                name: username,
                level: 0,
                experience: 0,
                credits: 0,
                stats: [],
                dailyCooldown: 0,
            });

            mongoose.connection.models.economy.players.push(playerModel);
            console.log('User didnt exist but now he does ! That should works !');
        }
    }
};