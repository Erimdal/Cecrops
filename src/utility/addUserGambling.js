const prisma = require('../prismaClient');
const fs = require('fs');

module.exports = async (name, clientId) => {
    fs.readFile('../../parameters/games.json', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        const file = JSON.parse(data);

        let statistics = new Array(0);

        for (const element of file) {
            const value = Object.entries(element)[0][1];
            const statistic = {
                'gameName': value,
                'profits': 0,
            };
            statistics.push(statistic);
        }

        return prisma.users.create({
            data: {
                clientId,
                credits: 0,
                dailyCooldown: new Date().now(),
                experience: 0,
                level: 1,
                name,
                statistics,
            },
        });
    });
};