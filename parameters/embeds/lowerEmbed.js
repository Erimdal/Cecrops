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
        .addField('La valeur que vous avez entrée est incorrecte', 'Merci de sélectionner un nombre entre 1 et 99.');
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
        .setTitle(`Résultats du lower | ${username}`)
        .addFields([
            {name: 'Vous remportez le pari !', value: 'Félicitations !', inline: true},
            {name: 'Tirage du bot', value: `Cecrops a tiré ${botValue}.`, inline: true},
            {name: 'Votre tirage', value: `Vous avez tiré ${userValue}.`, inline: true},
            {name: 'Gain', value: stringify(profit) + ' crédits.', inline: true},
            {name: 'Crédits', value: 'Vous avez ' + stringify(credits + profit) + ' crédits.', inline: true},
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
        .setTitle(`Résultats du lower | ${username}`)
        .addFields([
            {name: 'Vous perdez le pari !', value: 'Dommage !', inline: true},
            {name: 'Tirage du bot', value: `Cecrops a tiré ${botValue}.`, inline: true},
            {name: 'Votre tirage', value: `Vous avez tiré ${userValue}.`, inline: true},
            {name: 'Perte', value: stringify(bet) + ' crédits.', inline: true},
            {name: 'Crédits', value: 'Vous avez ' + stringify(credits - bet) + ' crédits.', inline: true},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

module.exports = {notEnoughBet, notEnoughCredits, valueNotExisting, levelUpEmbed, winningEmbed, losingEmbed};
