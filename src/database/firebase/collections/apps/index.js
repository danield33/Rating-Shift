const App = require('../app/App');

module.exports = class Apps {

    static apps = new Map();

    get(trackId, callback) {
        if (this.apps.has(trackId)) {
            callback(this.apps.get(trackId));
            return new AbortController();
        } else {//TODO replace with heroku
            const aborter = new AbortController();
            const {signal} = aborter;
            const params = new URLSearchParams({
                trackId: trackId,
            })
            const baseLink = 'http://localhost:3000/api/get?';
            const link = `${baseLink + params}`;

            fetch(link, {signal}).then(async res => {
                const response = await res.json();
                const app = new App(response);
                this.apps.set(trackId, app);
                callback(app);
            }).catch(() => {
            })

            return aborter;
        }

    }

    get apps() {
        return Apps.apps;
    }

}