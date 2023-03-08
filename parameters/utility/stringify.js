/**
 * @function
 * @param {number} number
 * @returns {String}
 */
module.exports = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};