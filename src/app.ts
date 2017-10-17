import * as express from 'express';
import * as builder from 'botbuilder';

import config = require('./config');

import StartDialog = require('./dialogs/start');

const app = express();

const connector = new builder.ChatConnector({
    appId: config.bot.app,
    appPassword: config.bot.key,
});

const bot = new builder.UniversalBot(connector);

// Setup Express Server
app.listen(process.env.port || process.env.PORT || 3978, '::', () => {
    console.log('Server Up');
});

app.post('/api/messages', connector.listen());

// Entry point of the bot
bot.dialog('/',
    (session: builder.Session) => {
        session.endDialog("Echo " + session.message.text);
    }
);

//Register all dialogs here
(new StartDialog()).register(bot, config.dialogs.paths.start);

//Initiate welcome message on conversation update
bot.on('conversationUpdate', (message) => {
    if (message.membersAdded) {
        message.membersAdded.forEach((identity) => {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, config.dialogs.paths.start)
            }
        })
    }
})

//Initiate welcome dialog if added as contact
bot.on('contactRelationUpdate', (message) => {
    if (message.action === 'add') {
        bot.beginDialog(message.address, config.dialogs.paths.start)
    }
});

//Dialog Actions
bot.beginDialogAction('StartAction', config.dialogs.paths.start, { matches: /^Home|Menu|Start/i });