const {MessageEmbed} = require('discord.js');
const stringify = require('./utility/stringify');
const {notEnoughBet, notEnoughCredits, levelUpEmbed} = require('./commonEmbed');

const colors = require('../colors.json');

/**
 * @function
 * @returns {MessageEmbed}
 */
function valueNotExisting() {
    return new MessageEmbed()
        .setColor(colors.notAllowed)
        .addField('The value you have entered is incorrect.', 'Please choose a correct value.');
}

/**
 * @function
 * @param {string} username
 * @param {boolean} winningColor false -> red, true -> black
 * @param {number} winningValue
 * @param {number} profit
 * @param {number} credits
 * @param {number} experienceAdded
 * @returns {MessageEmbed}
 */
function winningCoinflipEmbed(username, winningColor, winningValue, profit, credits, experienceAdded) {
    const color = winningColor ? 'black' : 'red';

    return new MessageEmbed()
        .setColor(colors.win)
        .setTitle(`Roulette results - VICTORY | ${username}`)
        .addFields([
            {name: `Roulette value : ${winningValue}`, value: 'You have chosen color ' + color + '.', inline: true},
            {name: 'You have gained ' + stringify(profit) + ' credits.', value: 'You now have ' + stringify(credits + profit) + ' credits.', inline: false},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

/**
 * @function
 * @param {string} username
 * @param {boolean} losingColor false -> red, true -> black
 * @param {number} losingValue value choosen by the bot
 * @param {number} profit
 * @param {number} credits
 * @param {number} experienceAdded
 * @returns {MessageEmbed}
 */
function losingCoinflipEmbed(username, losingColor, losingValue, bet, credits, experienceAdded) {
    const color = losingColor ? 'black' : 'red';

    return new MessageEmbed()
        .setColor(colors.loss)
        .setTitle(`Roulette results - DEFEAT | ${username}`)
        .addFields([
            {name: `Roulette value : ${losingValue}`, value: 'You have chosen color ' + color + '.', inline: true},
            {name: 'You have lost ' + stringify(bet) + ' credits.', value: 'You now have ' + stringify(credits - bet) + ' credits.', inline: false},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

/**
 * @function
 * @param {string} username
 * @param {number} winningValue value selected by everyone here
 * @param {number} profit
 * @param {number} credits
 * @param {number} experienceAdded
 * @returns {MessageEmbed}
 */
function winningNumberEmbed(username, winningValue, profit, credits, experienceAdded) {
    return new MessageEmbed()
        .setColor(colors.win)
        .setTitle(`Roulette results - VICTORY | ${username}`)
        .addFields([
            {name: `Roulette value : ${winningValue}`, value: 'You exactly selected this value, congrats!', inline: true},
            {name: 'You have gained ' + stringify(profit) + ' credits.', value: 'You now have ' + stringify(credits + profit) + ' credits.', inline: false},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

/**
 * @function
 * @param {string} username
 * @param {number} winningValue value selected by the bot
 * @param {number} losingValue value selected by the user
 * @param {number} bet
 * @param {number} credits
 * @param {number} experienceAdded
 * @returns {MessageEmbed}
 */
function losingNumberEmbed(username, winningValue, losingValue, bet, credits, experienceAdded) {
    return new MessageEmbed()
        .setColor(colors.loss)
        .setTitle(`Roulette results - DEFEAT | ${username}`)
        .addFields([
            {name: `Roulette value : ${winningValue}`, value: `You have chosen value ${losingValue}`, inline: true},
            {name: 'You have lost ' + stringify(bet) + ' credits.', value: 'You now have ' + stringify(credits - bet) + ' credits.', inline: false},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

module.exports = {notEnoughBet, notEnoughCredits, levelUpEmbed, valueNotExisting, winningCoinflipEmbed, winningNumberEmbed, losingCoinflipEmbed, losingNumberEmbed};
