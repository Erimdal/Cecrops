const mongoose = require('mongoose');

const playerUniqueStatSchema = new mongoose.Schema({
    name: 'string',
    value: 'number',
});

const playerSchema = new mongoose.Schema({
    name: 'string',
    level: 'number',
    experience: 'number',
    credits: 'number',
    stats: [playerUniqueStatSchema],
    dailyCooldown: 'number',
});

const economicSchema = new mongoose.Schema({
    players: [playerSchema],
});

module.exports = mongoose.model('economy', economicSchema, 'economy');