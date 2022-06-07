const {MessageEmbed} = require('discord.js');
const stringify = require('./utility/stringify');
const {notEnoughBet, notEnoughCredits, levelUpEmbed} = require('./commonEmbed');

/**
 * @function
 * @returns {MessageEmbed}
 */
function horseNotExisting() {
    return new MessageEmbed()
        .setColor('#f00c0c')
        .addField('Le cheval que vous avez choisi n\'existe pas', 'Merci de choisir l\'une des valeurs suivantes : 1, 2, 3, 4 ou 5.');
}

/**
 * @function
 * @param {string} username
 * @param {Array<number>} results
 * @returns {MessageEmbed}
 */
function gamePlayingEmbed(username, results) {
    return new MessageEmbed()
        .setColor('#ee6618')
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
        .setColor('#0cf021')
        .setTitle(`Résultats du horse | ${username}`)
        .addFields([
            {name: 'Vous remportez le pari !', value: 'Félicitations !', inline: false},
            {name: `Le cheval ${winningHorse} a gagné !`, value: 'Vous remportez ' + stringify(bet * 4) + ' crédits.'},
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
        .setColor('#f00c0c')
        .setTitle(`Résultats du horse | ${username}`)
        .addFields([
            {name: 'Vous perdez le pari !', value: `Vous aviez misé sur le cheval ${horseChoosen}`, inline: false},
            {name: `Le cheval ${winningHorse} a gagné !`, value: 'Vous perdez ' + stringify(bet) + ' crédits.'},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

module.exports = {horseNotExisting, notEnoughCredits, notEnoughBet, gamePlayingEmbed, levelUpEmbed, winningEmbed, losingEmbed};
