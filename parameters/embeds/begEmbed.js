const {MessageEmbed} = require('discord.js');
const stringify = require('./utility/stringify');

const colors = require('../colors.json');

/**
 * @function
 * @param {number} credits
 * @returns {MessageEmbed}
 */
function alreadyCredits(credits) {
    return new MessageEmbed()
        .setColor(colors.notAllowed)
        .addFields([
            {name: 'Vous avez déjà de l\'argent !', value: 'On ne mendie pas quand on a déjà autant d\'argent, voyons !'},
            {name: 'Crédits restants', value: stringify(credits)},
        ]);
}

/**
 * @function
 * @param {number} minutes
 * @param {number} seconds
 * @returns {MessageEmbed}
 */
function cannotBegAgainYet(minutes, seconds) {
    return new MessageEmbed()
        .setColor(colors.notAllowed)
        .addField('Vous avez déjà mendié récemment !', `Attendez encore ${minutes} minutes et ${seconds} secondes pour mendier à nouveau.`);
}

/**
 * @function
 * @returns {MessageEmbed}
 */
function successfullyBegging() {
    return new MessageEmbed()
        .setColor(colors.allowed)
        .addField('Vous avez reçu 10,000 crédits !', 'Ici apparaîtra un message rigolo dans lequel seront indiquées les conditions dans lesquelles vous avez mendié.');
}

module.exports = {alreadyCredits, cannotBegAgainYet, successfullyBegging};
