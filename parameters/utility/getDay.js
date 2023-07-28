/**
 * @function
 * @param {number} dayOfTheWeek
 * @param {Date} date
 * @returns {String}
 */
module.exports = (dayOfTheWeek, date) => {
    date.setDate(date.getDate() - date.getDay() + 7 + dayOfTheWeek);
    console.log(date);
    return date.toLocaleDateString();
};