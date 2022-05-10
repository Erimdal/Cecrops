const BotClient = require('./client.js');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const parameter = require('../parameter.json');

/* Lecture de la configuration */

const envConfig = dotenv.parse(fs.readFileSync('.env'));

for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

/* Démarrage du client (de nombreuses options sont gérées) */

const client = new BotClient({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_INTEGRATIONS',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_TYPING',
        'GUILD_INVITES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
        'GUILD_PRESENCES',
        'GUILD_SCHEDULED_EVENTS',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGES',
        'GUILD_WEBHOOKS',
    ],
    defaultPrefix: parameter.prefix,
    presence: {
        activities: [{
            name: parameter.activity.status,
            type: parameter.activity.type,
        }],
    },
    caseInsensitiveCommands: true,
    caseInsensitivePrefixes: false,
    disableMentionPrefix: true,
});

/* Gestion des erreurs, à ne pas toucher */

fs.readdir('./src/events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const eventFunction = require(`./events/${file}`);
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