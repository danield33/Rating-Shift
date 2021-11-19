import {Base64} from 'js-base64';

module.exports = class AppMonsta{

    #type = 'itunes';
    #token = 'f252f4f8ef92ad623affb93bc2640c36b04cc486';

    get baseURL() {
        return 'https://api.appmonsta.com/v1/stores/'+this.#type;
    }


    async top(options){
        return this.getData(`${this.baseURL}/rankings.json?`, options)
    }

    async query(options, body){
        // return new Promise(resolve => {
        //     fetch(`${this.baseURL}v2.0/${this.type}/query.json?` + new URLSearchParams({
        //         access_token: this.#token,
        //         ...options,
        //     }), {
        //         method: 'post',
        //         body: JSON.stringify(body),
        //         headers: {'Content-Type': 'application/json'}
        //     }).then(async res => resolve(await res.json())).catch(console.error);
        // })
    }

    async lookup(options){
        // return this.getData(`${this.baseURL}v2.0/${this.type}/lookup.json?`, options)
    }

    async reviews(options){
        // return this.getData(`${this.baseURL}v4.0/${this.type}/reviews.json?`, options)
    }

    async search(options){
        // return this.getData(`${this.baseURL}v2.0/${this.type}/search.json?`, options);
    }

    getData(url, options={}){
        return new Promise(resolve => {
            fetch('https://api.appmonsta.com/v1/stores/android/rankings.json?date=2021-11-18&country=US', {
                headers: {
                    'Authorization': 'Basic ' + Base64.encode(this.#token+':X')
                }
            }).then(async app => {
                const text = JSON.parse(JSON.stringify(await app.text()));
                const textData = text.split('\n').join(',');
                const data = JSON.parse('['+textData.substring(0, textData.length-1)+']');
                resolve(data);

            })
        })
    }

    get type(){
        return this.#type;
    }

    get android(){
        this.#type = 'android';
        return this;
    }

    get ios(){
        this.#type = 'itunes';
        return this;
    }

}
