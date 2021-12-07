import IOSGenres from './IOSGenres';

module.exports = class API {

    genres = IOSGenres;
    #topLink = 'http://ratingshift.ddns.net:3000/api/top?'

    top(options, callback) {

        const abort = new AbortController();
        this.getData(this.#topLink, options, abort.signal, callback);
        return abort;
    }

    getData(url, options, signal, callback) {
        fetch(url+new URLSearchParams(options), {signal}).then(async res => {
            callback(await res.json())
        })
    }

}
