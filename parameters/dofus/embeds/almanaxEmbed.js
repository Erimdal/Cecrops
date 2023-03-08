const {MessageEmbed} = require('discord.js');

const colors = require('../colors.json');

/**
 * @function
 * @returns {MessageEmbed}
 */
function notValidDaysNumberEmbed() {
    return new MessageEmbed()
        .setColor(colors.red);
}

/**
 * @function
 * @param {Array<JSON>} offerings
 * @returns {MessageEmbed}
 */
function offeringListEmbed(offerings) {
    return new MessageEmbed()
        .setColor(colors.neutral);
}

/**
 * @function
 * @param {JSON} offering
 * @returns {MessageEmbed}
 */
function singleOfferingEmbed(offering) {
    return new MessageEmbed()
        .setColor(colors.neutral)
        .setTitle(offering.date);
}

module.exports = {notValidDaysNumberEmbed, offeringListEmbed, singleOfferingEmbed};
