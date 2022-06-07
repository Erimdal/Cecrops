const {MessageEmbed} = require('discord.js');

/**
 * @function
 * @returns {MessageEmbed}
 */
module.exports = () => {
    return new MessageEmbed()
        .setColor('#0cf021')
        .addField('Vous avez reçu 10,000 crédits !', 'Ici apparaîtra un message rigolo dans lequel seront indiquées les conditions dans lesquelles vous avez mendié.');
};
