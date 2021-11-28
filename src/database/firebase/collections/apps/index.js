const App = require('../app/App');

module.exports = class Apps{

    static apps = new Map();

    constructor() {

    }

    async get(trackId, link){
        if(this.apps.has(trackId))
            return Promise.resolve(this.apps.get(trackId));
        else{//TODO replace with heroku
            const params = new URLSearchParams({
                trackId: trackId,
                link: link
            })
            return new Promise((resolve => {
                const baseLink = __DEV__ ? 'http://localhost:3000/api/get?' : 'https://ratingshiftapi.herokuapp.com/api/get?'
                const link = `${baseLink+params}`;

                fetch(link).then(async res => {
                    const response = await res.json();
                    const app = new App(response);
                    this.apps.set(trackId, app);
                    resolve(app);
                })
            }))

        }

    }

    get apps(){
        return Apps.apps;
    }

}