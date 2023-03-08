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
            case 0:
                consideredMonth = "janvier";
                break;
            case 1:
                consideredMonth = "février";
                break;
            case 2:
                consideredMonth = "mars";
                break;
            case 3:
                consideredMonth = "avril";
                break;
            case 4:
                consideredMonth = "mai";
                break;
            case 5:
                consideredMonth = "juin";
                break;
            case 6:
                consideredMonth = "juillet";
                break;
            case 7:
                consideredMonth = "août";
                break;
            case 8:
                consideredMonth = "septembre";
                break;
            case 9:
                consideredMonth = "octobre";
                break;
            case 10:
                consideredMonth = "novembre";
                break;
            case 11:
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
        case 0:
            month = "janvier";
            break;
        case 1:
            month = "février";
            break;
        case 2:
            month = "mars";
            break;
        case 3:
            month = "avril";
            break;
        case 4:
            month = "mai";
            break;
        case 5:
            month = "juin";
            break;
        case 6:
            month = "juillet";
            break;
        case 7:
            month = "août";
            break;
        case 8:
            month = "septembre";
            break;
        case 9:
            month = "octobre";
            break;
        case 10:
            month = "novembre";
            break;
        case 11:
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
