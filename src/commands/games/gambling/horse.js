const {Command} = require('@sapphire/framework');

const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const retrieveUser = require('../../../utility/retrieveUser');

module.exports = class HorseCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'horse',
            description: 'Joue une course de chevaux',
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand(
            (builder) =>
                builder
                    .setName('horse')
                    .setDescription('Joue une course de chevaux')
                    .addNumberOption(option =>
                        option
                            .setName('cheval')
                            .setDescription('Le cheval sur lequel vous voulez parier, de 1 à 5')
                            .setRequired(true),
                    )
                    .addNumberOption(option =>
                        option
                            .setName('enjeu')
                            .setDescription('Votre mise')
                            .setRequired(true),
                    ),

            {
                guildsId: [process.env.GUILD_ID],
            },
        );
    }

    async chatInputRun(interaction) {
        const clientId = parseInt(interaction.user.id);
        const name = interaction.user.username;

        const user = await retrieveUser(name, clientId);

        const bet = interaction.options.getNumber('enjeu');
        const horseChoosen = interaction.options.getNumber('cheval');

        
    }
};