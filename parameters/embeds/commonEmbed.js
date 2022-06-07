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
        .addField(`Niveau ${level} atteint !`, 'Félicitations !');
}

/**
 * @function
 * @param {number} credits
 * @returns {MessageEmbed}
 */
function notEnoughCredits(credits) {
    return new MessageEmbed()
        .setColor(colors.notAllowed)
        .addField('Vous n\'avez pas assez de crédits.', 'Vous avez ' + stringify(credits) + ' crédits restants.');
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
        .addField('Vous devez parier au minimum ' + stringify(minimumBet) + ' crédits.', 'Vous avez ' + stringify(credits) + ' crédits restants.');
}

module.exports = {levelUpEmbed, notEnoughBet, notEnoughCredits};
