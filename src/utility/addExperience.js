const prisma = require('../prismaClient');

function computeLevel(level, experience, experienceAdded) {
    const experienceToNextLevel = Math.floor(((level + 1) / 0.12) ** 2) - experience;
    if (experienceToNextLevel > experienceAdded) {
        return level;
    }
    else {
        return computeLevel(level + 1, experience + experienceToNextLevel, experienceAdded - experienceToNextLevel);
    }
}

module.exports = async (clientId, amount) => {
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
};