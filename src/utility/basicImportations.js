const dotenv = require('dotenv');
const fs = require('fs');

/**
 * Getter for the general config, with bot token
 * @returns {dotenv.DotenvParseOutput}
 */
function envConfig() {
    return dotenv.parse(fs.readFileSync('.env'));
}

/**
 * Retrieves all parameters of the command given in argument
 * @param {String} commandName
 * @returns {Object}
 */
function commandsParameters(commandName) {
    const file = JSON.parse(fs.readFileSync('parameters/commands_parameters.json', 'utf-8'));

    for (const element of file) {
        if (element.commandIndex === commandName) {
            return element;
        }
    }

    throw new Error('Command name not found in the parameters');
}

module.exports = {envConfig, commandsParameters};
