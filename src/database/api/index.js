import IOSGenres from './IOSGenres';
import App from "../firebase/collections/app/App";

module.exports = class API {

    genres = IOSGenres;
    #link = 'http://192.168.1.35:3000';
    #topLink = this.#link+'/api/top?';
    #getLink = this.#link+'/api/get?';

    top(options, callback) {

        const abort = new AbortController();
        this.getData(this.#topLink, options, abort.signal, callback);
        return abort;
    }

    get(trackId, callback){
        const aborter = new AbortController();
        const {signal} = aborter;
        const params = new URLSearchParams({
            trackId: trackId,
        })

        const link = `${this.#getLink + params}`;
        fetch(link, {signal}).then(async res => {
            const response = await res.json();
            const app = new App(response);
            await app.waitForData();
            callback(app);
        }).catch(() => {});
        return aborter;
    }

    getData(url, options, signal, callback) {
        fetch(url+new URLSearchParams(options), {signal}).then(async res => {
            callback(await res.json())
        })
    }

}
