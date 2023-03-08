const {MessageEmbed} = require('discord.js');

const colors = require('../colors.json');

/**
 * @function
 * @returns {MessageEmbed}
 */
function notValidDaysNumberEmbed() {
    return new MessageEmbed()
        .setColor(colors.red)
        .setTitle("Format invalide pour le nombre de jours à calculer.");
}

/**
 * @function
 * @param {Array<JSON>} offerings
 * @returns {MessageEmbed}
 */
function offeringListEmbed(offerings) {
    let fields = []

    offerings.forEach(offering => {
        const consideredDate = new Date(offering.date)
        let consideredMonth = ""
        switch (consideredDate.getUTCMonth()) {
            case 1:
                consideredMonth = "janvier";
                break;
            case 2:
                consideredMonth = "février";
                break;
            case 3:
                consideredMonth = "mars";
                break;
            case 4:
                consideredMonth = "avril";
                break;
            case 5:
                consideredMonth = "mai";
                break;
            case 6:
                consideredMonth = "juin";
                break;
            case 7:
                consideredMonth = "juillet";
                break;
            case 8:
                consideredMonth = "août";
                break;
            case 9:
                consideredMonth = "septembre";
                break;
            case 10:
                consideredMonth = "octobre";
                break;
            case 11:
                consideredMonth = "novembre";
                break;
            case 12:
                consideredMonth = "décembre";
                break;
        }

        fields.push({name: "Almanax du " + consideredDate.getUTCDate() + " " + consideredMonth + " " + consideredDate.getFullYear() + `${offering.resource.number} x ${offering.resource.name} pour ${offering.kamas} kamas.`, value: `${offering.bonus.name} : ${offering.bonus.description}.`})
    });

    console.log(fields);

    return new MessageEmbed()
        .setColor(colors.neutral)
        .addFields(fields);
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
            {name: `Nous célébrons ${offering.meridia.name} !`, value: `${offering.bonus.name} : ${offering.bonus.description}.`},
            {name: `Offrande du jour :`, value: `${offering.resource.number} x ${offering.resource.name} pour ${offering.kamas} kamas.`}
        );
}

module.exports = {notValidDaysNumberEmbed, offeringListEmbed, singleOfferingEmbed};
