const {MessageEmbed} = require('discord.js');
const stringify = require('../../utility/stringify');
const getDay = require('../../utility/getDay')

const colors = require('../colors.json');


/**
 * @function
 * @param {Date} date
 * @returns {MessageEmbed}
 */
function normalScheduleEmbed(date) {
    return new MessageEmbed()
        .setColor(colors.normalSchedule)
        .setTitle(`Avalanche - Semaine du lundi ${getDay(1, date)} au dimanche ${getDay(7, date)}`)
}

/**
 * @function
 * @param {Date} date
 * @returns {MessageEmbed}
 */
function holidaysScheduleEmbed(date) {
    return new MessageEmbed()
        .setColor(colors.holidaysSchedule)
        .setTitle(`Avalanche - Semaine du lundi ${getDay(1, date)} au dimanche ${getDay(7, date)}`)
}

/**
 * @function
 * @param {number} level
 * @returns {MessageEmbed}
 */
function levelUpEmbed(level) {
    return new MessageEmbed()
        .setColor(colors.levelUp)
        .setTitle('Level up !')
        .addFields([{name: `You are now level ${level}!`, value: 'Congrats!'}]);
}

/**
 * @function
 * @param {number} credits
 * @returns {MessageEmbed}
 */
function notEnoughCredits(credits) {
    return new MessageEmbed()
        .setColor(colors.notAllowed)
        .addFields([{name: 'You don\'t have enough credits.', value: 'You have ' + stringify(credits) + ' credits remaining.'}]);
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
        .addFields([{name: 'You must bet at least ' + stringify(minimumBet) + ' credits (5% of your wealth).', value: 'You have ' + stringify(credits) + ' credits remaining.'}]);
}

module.exports = {normalScheduleEmbed, holidaysScheduleEmbed};
