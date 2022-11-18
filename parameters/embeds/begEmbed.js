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
            {name: 'You already have credits.', value: 'Don\'t beg money if you\'re not in the need!'},
            {name: 'Credits remaining :', value: stringify(credits)},
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
        .addField('You will be bullied if you beg again.', `Please wait ${minutes} minutes and ${seconds} seconds and try again.`);
}

/**
 * @function
 * @returns {MessageEmbed}
 */
function successfullyBegging() {
    const begMessages = [
        'Haven\'t you finished crying yet ? Take that tissue at least, you\'re pathetic.',
        'The person that gave you that money left you alone with a terrifying smile...',
        'You will clearly use cleverly this money, right? Right?',
        'You didn\'t even beg, you just hit this random dude ! You\'re such an asshole.',
        'You are lucky despite all the bad things you\'ve done so far... Why?',
    ];

    return new MessageEmbed()
        .setColor(colors.allowed)
        .addField('You received 10,000 credits!', begMessages[Math.floor(Math.random() * begMessages.length)]);
}

module.exports = {alreadyCredits, cannotBegAgainYet, successfullyBegging};
