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
    const currentDate = new Date(offering.date)
    let month = ""
    switch (currentDate.getUTCMonth()) {
        case 1:
            month = "janvier";
            break;
        case 2:
            month = "février";
            break;
        case 3:
            month = "mars";
            break;
        case 4:
            month = "avril";
            break;
        case 5:
            month = "mai";
            break;
        case 6:
            month = "juin";
            break;
        case 7:
            month = "juillet";
            break;
        case 8:
            month = "août";
            break;
        case 9:
            month = "septembre";
            break;
        case 10:
            month = "octobre";
            break;
        case 11:
            month = "novembre";
            break;
        case 12:
            month = "décembre";
            break;
    }

    const encoder = new TextEncoder();

    return new MessageEmbed()
        .setColor(colors.neutral)
        .setTitle("Almanax du " + currentDate.getUTCDate() + " " + month + " " + currentDate.getFullYear())
        .setThumbnail(offering.meridia.image)
        .setImage(offering.resource.image)
        .addFields(
            {name: encoder.encode(`Nous célébrons ${offering.meridia.name} !`), value: encoder.encode(`${offering.bonus.name} : ${offering.bonus.description}.`)},
            {name: encoder.encode(`Offrande du jour :`), value: encoder.encode(`${offering.resource.number} x ${offering.resource.name} pour ${offering.kamas} kamas.`)}
        );
}

module.exports = {notValidDaysNumberEmbed, offeringListEmbed, singleOfferingEmbed};
