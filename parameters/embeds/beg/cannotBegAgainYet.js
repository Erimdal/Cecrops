const {MessageEmbed} = require('discord.js');

/**
 * @function
 * @param {number} minutes
 * @param {number} seconds
 * @returns {MessageEmbed}
 */
module.exports = (minutes, seconds) => {
    return new MessageEmbed()
        .setColor('#f00c0c')
        .addField('Vous avez déjà mendié récemment !', `Attendez encore ${minutes} minutes et ${seconds} secondes pour mendier à nouveau.`);
};
