const prisma = require('../prismaClient');
const fs = require('fs');

/**
 * @function
 * @param {number} credits
 * @returns {number}
 */
function minimumBet(credits) {
    return Math.max(Math.round(credits * 0.05), 100);
}

/**
 * The experience needed to achive a certain level, starting from zero
 * @param {number} level The level to achieve
 * @returns {number}
 */
function experienceToLevel(level) {
    return Math.floor((level / 0.12) ** 2);
}

/**
 * The experience needed to achieve level, starting from the level just below
 * @param {number} level
 * @returns {number}
 */
function experiencePerLevel(level) {
    return experienceToLevel(level) - experienceToLevel(level - 1);
}

/**
 * @function
 * @param {number} level
 * @param {number} experience
 * @param {number} experienceAdded
 * @returns {number}
 */
function computeLevel(level, experience, experienceAdded) {
    const experienceToNextLevel = experienceToLevel(level + 1) - experience;

    if (experienceToNextLevel > experienceAdded) {
        return level;
    }
    else {
        return computeLevel(level + 1, experience + experienceToNextLevel, experienceAdded - experienceToNextLevel);
    }
}

/**
 * @function
 * @async
 * @param {number} clientId
 * @param {number} amount
 * @returns {number} Le niveau à la fin de l'ajout d'expérience
 */
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

/**
 * @function
 * @async
 * @param {string} name
 * @param {number} clientId
 * @returns {import('@prisma/client').Users}
 */
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

/**
 * @function
 * @async
 * @param {number} clientId
 * @param {number} profit can be a negative number too
 */
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

module.exports = {minimumBet, experienceToLevel, experiencePerLevel, addExperience, retrieveUser, modifyUserCredits};
