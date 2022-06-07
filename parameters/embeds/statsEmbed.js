const {MessageEmbed} = require('discord.js');

const colors = require('../colors.json');

/**
 * @function
 * @param {Array<Object>} statistics
 * @returns {Object}
 */
function produceFields(statistics) {
    let totalProfits = 0;
    let fields = new Array();

    statistics.forEach((data) => {
        totalProfits += data.profits;
        fields.push({name: `${data.gameName}`, value: `${data.profits}`, inline: true});
    });

    fields.unshift({name: 'Total', value: `${totalProfits}`, inline: true});

    return fields;
}

/**
 * @function
 * @param {string} username
 * @param {Array<Object>} statistics
 * @returns {MessageEmbed}
 */
function statsEmbed(username, statistics) {
    const fields = produceFields(statistics);

    return new MessageEmbed()
        .setColor(colors.neutral)
        .setTitle(`Statistiques pour ${username}`)
        .addFields(fields);
}

module.exports = {statsEmbed};
