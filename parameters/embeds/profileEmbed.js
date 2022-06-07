const {MessageEmbed} = require('discord.js');
const stringify = require('./utility/stringify');

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
        .setColor('#ee6618')
        .setTitle(`Profil de ${username}`)
        .addFields([
            {name: 'Niveau d\'utilisateur', value: `${level}`, inline: true},
            {name: 'Crédits', value: credits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), inline: true},
            {name: 'Mise minimale', value: stringify(minimumBet) + ' crédits', inline: true},
            {name: 'Progression', value: `${percentageOfProgression}% [ ` + '= '.repeat(numberOfProgressionTiles) + '- '.repeat(10 - numberOfProgressionTiles) + ']', inline: true},
            {name: 'Prochain niveau', value: stringify(experienceToNextLevel) + ' / ' + stringify(experienceNeededToNextLevel) + ' XP', inline: true},
            {name: 'Total d\'expérience', value: stringify(totalExperience) + ' XP', inline: true},
        ]);
}

module.exports = {profileEmbed};
