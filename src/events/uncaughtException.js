module.exports = {
    run: (client, error) => {
        if (!error) return;

        client.logger.log('error', error.stack ? error.stack : error.toString());
    },
};