const {MessageEmbed} = require('discord.js');
const stringify = require('./utility/stringify');
const {levelUpEmbed, notEnoughBet, notEnoughCredits} = require('./commonEmbed');

const colors = require('../colors.json');

/**
 * @function
 * @returns {MessageEmbed}
 */
function valueNotExisting() {
    return new MessageEmbed()
        .setColor('#f00c0c')
        .addFields([{name: 'The value you have given can\'t be used.', value: 'Please choose a number between 1 and 99.'}]);
}

/**
 * @function
 * @param {string} username
 * @param {number} botValue
 * @param {number} userValue
 * @param {number} profit
 * @param {number} credits
 * @param {number} experienceAdded
 * @returns {MessageEmbed}
 */
function winningEmbed(username, botValue, userValue, profit, credits, experienceAdded) {
    return new MessageEmbed()
        .setColor(colors.win)
        .setTitle(`Lower results - VICTORY | ${username}`)
        .addFields([
            {name: 'Bot number', value: `Cecrops has chosen ${botValue}.`, inline: true},
            {name: 'Your number', value: `You have chosen ${userValue}.`, inline: true},
            {name: 'You have gained ' + stringify(profit) + ' credits.', value: 'You now have ' + stringify(credits + profit) + ' credits.', inline: false},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

/**
 * @function
 * @param {string} username
 * @param {number} botValue
 * @param {number} userValue
 * @param {number} bet
 * @param {number} credits
 * @param {number} experienceAdded
 * @returns {MessageEmbed}
 */
function losingEmbed(username, botValue, userValue, bet, credits, experienceAdded) {
    return new MessageEmbed()
        .setColor(colors.loss)
        .setTitle(`Lower results - DEFEAT | ${username}`)
        .addFields([
            {name: 'Bot number', value: `Cecrops has chosen ${botValue}.`, inline: true},
            {name: 'Your number', value: `You have chosen ${userValue}.`, inline: true},
            {name: 'You have lost ' + stringify(bet) + ' credits.', value: 'You now have ' + stringify(credits - bet) + ' credits.', inline: false},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

module.exports = {notEnoughBet, notEnoughCredits, valueNotExisting, levelUpEmbed, winningEmbed, losingEmbed};
