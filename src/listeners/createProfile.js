const {Listener} = require('@sapphire/framework');
const mongoose = require('mongoose');
const playerSchema = require('../database/gamblingEconomy');

module.exports = class createProfileListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: 'creationOfProfileForGambling',
        });
    }

    async run(client) {
        const {username} = client.user;
        const connection = mongoose.createConnection();

        const playerModel = await new playerSchema({
            name: username,
            level: 0,
            experience: 0,
            credits: 0,
            stats: [],
            dailyCooldown: 0,
        });

        connection.models.economy.players.push(playerModel);
    }
};