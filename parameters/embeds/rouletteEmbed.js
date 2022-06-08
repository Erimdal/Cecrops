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
        .addField('La valeur que vous avez entrée est incorrecte', 'Merci de sélectionner un nombre entre 0 et 36 ou bien \'red\' ou \'black\'.');
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
        .setTitle(`Résultats de la roulette - VICTOIRE | ${username}`)
        .addFields([
            {name: `Tirage de la roulette : ${winningValue}`, value: 'Vous aviez choisi la couleur ' + color + '.', inline: true},
            {name: 'Vous remportez ' + stringify(profit) + ' crédits.', value: 'Vous avez ' + stringify(credits + profit) + ' crédits.', inline: false},
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
        .setTitle(`Résultats de la roulette - DÉFAITE | ${username}`)
        .addFields([
            {name: `Tirage de la roulette : ${losingValue}`, value: 'Vous aviez choisi la couleur ' + color + '.', inline: true},
            {name: 'Vous perdez ' + stringify(bet) + ' crédits.', value: 'Vous avez ' + stringify(credits - bet) + ' crédits.', inline: false},
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
        .setTitle(`Résultats de la roulette - VICTOIRE | ${username}`)
        .addFields([
            {name: `Tirage de la roulette : ${winningValue}`, value: 'Vous aviez choisi la même valeur, bravo !', inline: true},
            {name: 'Vous remportez ' + stringify(profit) + ' crédits.', value: 'Vous avez ' + stringify(credits + profit) + ' crédits.', inline: false},
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
        .setTitle(`Résultats de la roulette - DÉFAITE | ${username}`)
        .addFields([
            {name: `Tirage de la roulette : ${winningValue}`, value: `Vous aviez choisi la valeur ${losingValue}`, inline: true},
            {name: 'Vous perdez ' + stringify(bet) + ' crédits.', value: 'Vous avez ' + stringify(credits - bet) + ' crédits.', inline: false},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

module.exports = {notEnoughBet, notEnoughCredits, levelUpEmbed, valueNotExisting, winningCoinflipEmbed, winningNumberEmbed, losingCoinflipEmbed, losingNumberEmbed};
