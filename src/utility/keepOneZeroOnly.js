/**
 * @function
 * @param {Array<number>} array
 * @returns {Array<number>}
 */
module.exports = (array) => {
    if (array.includes(0)) {
        const randomExploration = Array.from(Array(array.length), (_, index) => index + 1).sort(() => Math.random() - 0.5);
        let foundZero = false;

        randomExploration.forEach((value) => {
            if (array[value] === 0 && foundZero) {
                array[value] = 1;
            }
            else if (array[value] === 0) {
                foundZero = true;
            }
        });
    }
    return array;
};
