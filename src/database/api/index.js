import IOSGenres from './IOSGenres';
import App from "../firebase/collections/app/App";

module.exports = class API {

    genres = IOSGenres;
    #link = 'http://192.168.1.35:3000';
    #topLink = this.#link+'/api/top?';
    #getLink = this.#link+'/api/get?';

    /**
     * Fetches the top apps
     * @param options options for fetching: genre, type: free | top
     * @param callback returns the apps found
     * @returns {AbortController}
     */
    top(options, callback) {

        const abort = new AbortController();
        this.getData(this.#topLink, options, abort.signal, callback);
        return abort;
    }

    /**
     * Fetches an app by trackID
     * @param trackId the id of the app to get
     * @param callback returns the app found
     * @returns {AbortController}
     */
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

    /**
     * gets information from the server
     * @param url the url to fetch
     * @param options the parameters of the url
     * @param signal abort signal
     * @param callback returns fetched data
     */
    getData(url, options, signal, callback) {
        fetch(url+new URLSearchParams(options), {signal}).then(async res => {
            callback(await res.json())
        })
    }

}
