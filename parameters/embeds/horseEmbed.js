const {MessageEmbed, CommandInteraction} = require('discord.js');
const stringify = require('./utility/stringify');

/**
 * @function
 * @param {CommandInteraction} interaction
 * @param {Array<number>} results
 * @returns {MessageEmbed}
 */
function gamePlayingEmbed(interaction, results) {
    return new MessageEmbed()
        .setColor('#ee6618')
        .setTitle(`Course de ${interaction.user.username}`)
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
 * @param {number} level
 * @returns {MessageEmbed}
 */
function levelUpEmbed(level) {
    return new MessageEmbed()
        .setColor('#0cf021')
        .setTitle('Level up !')
        .addField(`Niveau ${level} atteint !`, 'Félicitations !');
}

/**
 * @function
 * @param {import('@prisma/client').Users} user
 * @param {number} bet
 * @param {number} experienceAdded
 * @param {number} winningHorse
 * @returns {MessageEmbed}
 */
function winningEmbed(user, bet, experienceAdded, winningHorse) {
    return new MessageEmbed()
        .setColor('#0cf021')
        .setTitle(`Résultats du horse | ${user.name}`)
        .addFields([
            {name: 'Vous remportez le pari !', value: 'Félicitations !', inline: false},
            {name: `Le cheval ${winningHorse} a gagné !`, value: 'Vous remportez ' + stringify(bet * 4) + ' crédits.'},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}

/**
 * @function
 * @param {import('@prisma/client').Users} user
 * @param {*} bet
 * @param {number} experienceAdded
 * @param {number} winningHorse
 * @param {number} horseChoosen
 * @returns {MessageEmbed}
 */
function losingEmbed(user, bet, experienceAdded, winningHorse, horseChoosen) {
    return new MessageEmbed()
        .setColor('#f00c0c')
        .setTitle(`Résultats du horse | ${user.name}`)
        .addFields([
            {name: 'Vous perdez le pari !', value: `Vous aviez misé sur le cheval ${horseChoosen}`, inline: false},
            {name: `Le cheval ${winningHorse} a gagné !`, value: 'Vous perdez ' + stringify(bet) + ' crédits.'},
        ])
        .setFooter({text: '+ ' + stringify(experienceAdded) + 'XP'});
}