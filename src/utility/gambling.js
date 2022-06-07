const prisma = require('../prismaClient');
const fs = require('fs');

function computeLevel(level, experience, experienceAdded) {
    const experienceToNextLevel = Math.floor(((level + 1) / 0.12) ** 2) - experience;
    if (experienceToNextLevel > experienceAdded) {
        return level;
    }
    else {
        return computeLevel(level + 1, experience + experienceToNextLevel, experienceAdded - experienceToNextLevel);
    }
}

async function addExperience(clientId, amount) {
    const user = await prisma.users.findFirst({
        where: {
            clientId,
        },
    });

    const level = user.level;
    const experience = user.experience;

    const newLevel = computeLevel(level, experience, amount);
    const newExperience = experience + amount;

    await prisma.users.updateMany({
        where: {
            clientId,
        },
        data: {
            experience: newExperience,
            level: newLevel,
        },
    });

    return newLevel;
}

async function retrieveUser(name, clientId) {
    const user = await prisma.users.findFirst({
        where: {
            clientId,
        },
    });

    if (user) {
        return user;
    }
    else {
        const file = JSON.parse(fs.readFileSync('parameters/gambling.json', 'utf-8'));

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

        return prisma.users.findFirst({
            where: {
                clientId,
            },
        });
    }
}

async function modifyUserCredits(clientId, profit) {
    const user = await prisma.users.findFirst({
        where: {
            clientId,
        },
    });

    const newCredits = user.credits + profit;

    await prisma.users.updateMany({
        where: {
            clientId,
        },
        data: {
            credits: newCredits,
        },
    });
}

module.exports = {addExperience, retrieveUser, modifyUserCredits};
