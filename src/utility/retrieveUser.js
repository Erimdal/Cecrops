const prisma = require('../prismaClient');
const fs = require('fs');

module.exports = async (name, clientId) => {
    const user = await prisma.users.findFirst({
        where: {
            clientId,
        },
    });

    if (user) {
        return user;
    }
    else {
        fs.readFile('parameters/games.json', 'utf-8', async (err, data) => {
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

            await prisma.users.create({
                data: {
                    clientId,
                    credits: 0,
                    dailyCooldown: new Date(Date.now()),
                    experience: 0,
                    level: 0,
                    name,
                    statistics,
                },
            });
        });

        const newUser = await prisma.users.findFirst({
            where: {
                clientId,
            },
        });

        return newUser;
    }
};