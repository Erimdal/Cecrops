const SapphireClient = require('./client');
// const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const parameter = require('./parameter.json');

/* Lecture de la configuration */

const envConfig = dotenv.parse(fs.readFileSync('../.env'));

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

/* Démarrage du client (de nombreuses options sont gérées) */

const client = new SapphireClient({
    intents: [],
    defaultPrefix: parameter.prefix,
    presence: {
        activity: {
            name: parameter.activity.status,
            type: parameter.activity.type,
        },
    },
    caseInsensitiveCommands: true,
    caseInsensitivePrefixes: false,
    disableMentionPrefix: true,
});

/* Gestion des erreurs, à ne pas toucher */

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const eventFunction = require(`.events/${file}`);
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter || client);
        const {once} = eventFunction;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(client, ...args));
        }
        catch (error) {
            console.error(error.stack);
        }
    });
});


/* Gestion du serveur Youtube */

client.server = {
    queue: [],
    currentVideo: {title: 'Nothing at first', url: ''},
    dispatcher: null,
    connection: null,
};

/* Lancement du bot */

client.login(process.env.BOT_TOKEN);