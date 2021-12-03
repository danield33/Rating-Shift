import {Query, Reviews, Search} from './example_responses';
import IOSGenres from './IOSGenres';

module.exports = class API {

    #type = 'ios/apps';
    baseURL = 'https://data.42matters.com/api/';
    #token = 'cc0966d239a6da778649d22b7cd4f8aa88b77f80';
    genres = IOSGenres;
    #topLink = __DEV__ ? 'http://localhost:3000/api/top?' : 'https://ratingshiftapi.herokuapp.com/api/top?';

    get type() {
        return this.#type;
    }

    get android() {
        this.#type = 'android/apps';
        return this;
    }

    get ios() {
        this.#type = 'ios/apps';
        return this;
    }

    async getTopGenreApps(genreID) {
        return await this.query({limit: 21, lang: 'en'}, {
            query: {
                query_params: {
                    from: 0,
                    sort: 'score',
                    primaryGenreId: genreID
                }
            }
        })
    }

    top(options, callback) {

        const abort = new AbortController();
        this.getData(this.#topLink, options, abort.signal, callback);
        return abort;
    }

    async query(options, body) {//TODO create some kind of api cache
        return Query;
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

    async lookup(options) {
        return this.getData(`${this.baseURL}v2.0/${this.type}/lookup.json?`, options)
    }

    async reviews(options) {
        return Reviews//this.getData(`${this.baseURL}v4.0/${this.type}/reviews.json?`, options)
    }

    async search(options) {
        return Search//this.getData(`${this.baseURL}v2.0/${this.type}/search.json?`, options);
    }

    getData(url, options, signal, callback) {

        fetch(url + new URLSearchParams(options), {signal})
            .then(async res => {
                callback(await res.json())
            });

    }

}