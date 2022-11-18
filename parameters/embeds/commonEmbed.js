const {MessageEmbed} = require('discord.js');
const stringify = require('./utility/stringify');

const colors = require('../colors.json');

/**
 * @function
 * @param {number} level
 * @returns {MessageEmbed}
 */
function levelUpEmbed(level) {
    return new MessageEmbed()
        .setColor(colors.levelUp)
        .setTitle('Level up !')
        .addField(`You are now level ${level}!`, 'Congrats!');
}

/**
 * @function
 * @param {number} credits
 * @returns {MessageEmbed}
 */
function notEnoughCredits(credits) {
    return new MessageEmbed()
        .setColor(colors.notAllowed)
        .addField('You don\'t have enough credits.', 'You have ' + stringify(credits) + ' credits remaining.');
}

/**
 * @function
 * @param {number} minimumBet
 * @param {number} credits
 * @returns {MessageEmbed}
 */
function notEnoughBet(minimumBet, credits) {
    return new MessageEmbed()
        .setColor(colors.notAllowed)
        .addField('You must bet at least ' + stringify(minimumBet) + ' credits (5% of your wealth).', 'You have ' + stringify(credits) + ' credits remaining.');
}

module.exports = {levelUpEmbed, notEnoughBet, notEnoughCredits};
