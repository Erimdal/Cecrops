module.exports = {
    run: (client) => {
        client.logger.log('info', `Bot identifié en tant que ${client.user.tag}! (${client.user.id})`);
    },
};