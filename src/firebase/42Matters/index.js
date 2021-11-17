module.exports = class FTMatters{

    #type = 'ios/apps';
    baseURL = 'https://data.42matters.com/api/';
    #token = '168485c1a07f83261eb76ca727665ba27b5a51d9';


    async top(options){
        return new Promise((resolve) => {
            fetch(`${this.baseURL}v3.0/${this.type}/top_appstore_charts.json?`+new URLSearchParams({
                access_token: this.#token,
                ...options
            }))
                .then(async res => resolve(await res.json())).catch(err => console.log(err));
        })
    }


    get type(){
        return this.#type;
    }

    get android(){
        this.#type = 'android/apps';
        return this;
    }

    get ios(){
        this.#type = 'ios/apps';
        return this;
    }

}