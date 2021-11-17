module.exports = class FTMatters{

    #type = 'ios/apps';
    baseURL = 'https://data.42matters.com/api/';
    #token = '168485c1a07f83261eb76ca727665ba27b5a51d9';


    async top(options){
        return this.getData(`${this.baseURL}v3.0/${this.type}/top_appstore_charts.json?`, options)
    }

    async query(options, body){
        return new Promise(resolve => {
            fetch(`${this.baseURL}v2.0/${this.type}/query.json?` + new URLSearchParams({
                access_token: this.#token,
                ...options,
            }), {
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            }).then(async res => resolve(await res.json())).catch(console.error);
        })
    }

    async lookup(options){
        return this.getData(`${this.baseURL}v2.0/${this.type}/lookup.json?`, options)
    }

    async reviews(options){
        return this.getData(`${this.baseURL}v4.0/${this.type}/reviews.json?`, options)
    }

    async search(options){
        return this.getData(`${this.baseURL}v2.0/${this.type}/search.json?`, options);
    }

    getData(url, options){
        return new Promise(resolve => {
            fetch(url+new URLSearchParams({
                access_token: this.#token,
                ...options
            })).then(async res => resolve(await res.json()))
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