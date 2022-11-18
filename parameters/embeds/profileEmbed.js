const {MessageEmbed} = require('discord.js');
const stringify = require('./utility/stringify');

const colors = require('../colors.json');

/**
 * @function
 * @param {string} username
 * @param {number} level
 * @param {number} credits
 * @param {number} minimumBet
 * @param {number} experienceToNextLevel
 * @param {number} experienceNeededToNextLevel
 * @param {number} totalExperience
 * @returns {MessageEmbed}
 */
function profileEmbed(username, level, credits, minimumBet, experienceToNextLevel, experienceNeededToNextLevel, totalExperience) {
    const percentageOfProgression = Math.round(experienceToNextLevel / experienceNeededToNextLevel * 100);
    const numberOfProgressionTiles = Math.floor(percentageOfProgression / 10);

    return new MessageEmbed()
        .setColor(colors.neutral)
        .setTitle(`Profil de ${username}`)
        .addFields([
            {name: 'User level', value: `${level}`, inline: true},
            {name: 'Credits', value: credits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), inline: true},
            {name: 'Minimum bet (5%)', value: stringify(minimumBet) + ' crédits', inline: true},
            {name: 'Progression until next level', value: `${percentageOfProgression}% [ ` + '= '.repeat(numberOfProgressionTiles) + '- '.repeat(10 - numberOfProgressionTiles) + ']', inline: true},
            {name: 'Next level', value: stringify(experienceToNextLevel) + ' / ' + stringify(experienceNeededToNextLevel) + ' XP', inline: true},
            {name: 'Total experience', value: stringify(totalExperience) + ' XP', inline: true},
        ]);
}

module.exports = {profileEmbed};
