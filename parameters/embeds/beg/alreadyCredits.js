const {MessageEmbed} = require('discord.js');

/**
 * @function
 * @param {import('@prisma/client').Users} user
 * @returns {MessageEmbed}
 */
module.exports = (user) => {
    return new MessageEmbed()
        .setColor('#f00c0c')
        .addFields([
            {name: 'Vous avez déjà de l\'argent !', value: 'On ne mendie pas quand on a déjà autant d\'argent, voyons !'},
            {name: 'Crédits restants', value: `${user.credits}`},
        ]);
};
