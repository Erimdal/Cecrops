const prisma = require('../prismaClient');

module.exports = async (clientId, profit) => {
    const user = await prisma.users.findFirst({
        where: {
            clientId,
        },
    });

    const newCredits = user.credits + profit;

    await prisma.users.update({
        where: {
            clientId,
        },
        data: {
            credits: newCredits,
        },
    });
};