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
    const begMessages = [
        "Oh, t'as pas fini de pleurer ? Tiens, un peu d'argent pour t'acheter des mouchoirs.",
        "La personne qui vous a donné cet argent est repartie avec un sourire maléfique...",
        "Vous allez faire bon usage de cet argent, n'est-ce pas ? :D",
        "Taper la  vieille dame, ce n'est plus mendier, m'enfin il faut ce qu'il faut...",
        "Malgré toutes vos mauvaises actions, vous semblez avoir une bonne étoile ! Mais vous êtes quand même horrible."
    ]

    return new MessageEmbed()
        .setColor(colors.allowed)
        .addField('Vous avez reçu 10,000 crédits !', begMessages[Math.floor(Math.random() * begMessages.length)]);
}

module.exports = {alreadyCredits, cannotBegAgainYet, successfullyBegging};
