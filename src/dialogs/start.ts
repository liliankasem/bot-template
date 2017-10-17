import * as builder from 'botbuilder';
import DialogBase = require('./dialog-base');

class Start extends DialogBase {
    setDialog() {
        this.dialog = [
            (session: builder.Session) => {
                session.endDialog("Hello world!");
            }
        ];
    }
}
export = Start;