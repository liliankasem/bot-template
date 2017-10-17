const config = {
    bot: {
        app: process.env.MICROSOFT_APP_ID || '',
        key: process.env.MICROSOFT_APP_PASSWORD || ''
    },
    luis: {
        app: process.env.LUIS_APP || '',
        key: process.env.LUIS_KEY || '',
        url: process.env.LUIS_URL || ''
    },
    dialogs: {
        paths: {
            // Add paths to bind dialogs here
            start: '/start'
        }
    }
};
export = config;