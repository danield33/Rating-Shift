module.exports = class Apps{

    static apps = new Map();

    constructor() {

    }

    async get(trackId){
        if(this.apps.has(trackId))
            return this.apps.get(apps);



    }

    get apps(){
        return Apps.apps;
    }

}