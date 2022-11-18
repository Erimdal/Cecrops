const {MessageEmbed} = require('discord.js');
const stringify = require('./utility/stringify');
const {notEnoughBet, notEnoughCredits, levelUpEmbed} = require('./commonEmbed');

const colors = require('../colors.json');

/**
 * @function
 * @returns {MessageEmbed}
 */
function horseNotExisting() {
    return new MessageEmbed()
        .setColor(colors.notAllowed)
        .addField('The horse that you have chosen doesn\'t exist.', 'Please choose a horse between 1 and 5.');
}

/**
 * @function
 * @param {string} username
 * @param {Array<number>} results
 * @returns {MessageEmbed}
 */
function gamePlayingEmbed(username, results) {
    return new MessageEmbed()
        .setColor(colors.neutral)
        .setTitle(`Course de ${username}`)
        .addFields([
            {name: ':checkered_flag:' + '- '.repeat(results[0]) + ':horse_racing: 1.', value: '\u200b', inline: false},
            {name: ':checkered_flag:' + '- '.repeat(results[1]) + ':horse_racing: 2.', value: '\u200b', inline: false},
            {name: ':checkered_flag:' + '- '.repeat(results[2]) + ':horse_racing: 3.', value: '\u200b', inline: false},
            {name: ':checkered_flag:' + '- '.repeat(results[3]) + ':horse_racing: 4.', value: '\u200b', inline: false},
            {name: ':checkered_flag:' + '- '.repeat(results[4]) + ':horse_racing: 5.', value: '\u200b', inline: false},
        ]);
}

/**
 * @function
 * @param {string} username
 * @param {number} bet
 * @param {number} experienceAdded
 * @param {number} winningHorse
 * @returns {MessageEmbed}
 */
function winningEmbed(username, bet, experienceAdded, winningHorse) {
    return new MessageEmbed()
        .setColor(colors.win)
        .setTitle(`Horse results - VICTORY | ${username}`)
        .addFields([
            {name: 'You win!', value: 'Congrats!', inline: false},
            {name: `Horse ${winningHorse} wins.`, value: 'You have gained ' + stringify(bet * 4) + ' credits.'},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

/**
 * @function
 * @param {string} username
 * @param {number} bet
 * @param {number} experienceAdded
 * @param {number} winningHorse
 * @param {number} horseChoosen
 * @returns {MessageEmbed}
 */
function losingEmbed(username, bet, experienceAdded, winningHorse, horseChoosen) {
    return new MessageEmbed()
        .setColor(colors.loss)
        .setTitle(`Horse results - DEFEAT | ${username}`)
        .addFields([
            {name: 'You lose!', value: `You bet on the dark horse, number ${horseChoosen}`, inline: false},
            {name: `Horse ${winningHorse} wins.`, value: 'You have lost ' + stringify(bet) + ' credits.'},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

module.exports = {horseNotExisting, notEnoughCredits, notEnoughBet, gamePlayingEmbed, levelUpEmbed, winningEmbed, losingEmbed};
