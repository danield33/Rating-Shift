module.exports = class Apps{

    static apps = new Map();

    constructor() {

    }

    async get(trackId, link){
        if(this.apps.has(trackId))
            return this.apps.get(apps);
        else{//TODO replace with heroku
            const params = new URLSearchParams({
                trackId: trackId,
                link: link
            })
            return new Promise((resolve => {
                const link = `http://localhost:3000/api/get?${params}`;

                fetch(link).then(async res => {
                    resolve(await res.json());
                })
            }))

        }

    }

    get apps(){
        return Apps.apps;
    }

}