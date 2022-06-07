const {MessageEmbed} = require('discord.js');

/**
 * @function
 * @param {import('@prisma/client').Users} user
 * @returns {MessageEmbed}
 */
function alreadyCredits(user) {
    return new MessageEmbed()
        .setColor('#f00c0c')
        .addFields([
            {name: 'Vous avez déjà de l\'argent !', value: 'On ne mendie pas quand on a déjà autant d\'argent, voyons !'},
            {name: 'Crédits restants', value: `${user.credits}`},
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
        .setColor('#f00c0c')
        .addField('Vous avez déjà mendié récemment !', `Attendez encore ${minutes} minutes et ${seconds} secondes pour mendier à nouveau.`);
}

/**
 * @function
 * @returns {MessageEmbed}
 */
function successfullyBegging() {
    return new MessageEmbed()
        .setColor('#0cf021')
        .addField('Vous avez reçu 10,000 crédits !', 'Ici apparaîtra un message rigolo dans lequel seront indiquées les conditions dans lesquelles vous avez mendié.');
}

module.exports = {alreadyCredits, cannotBegAgainYet, successfullyBegging};
