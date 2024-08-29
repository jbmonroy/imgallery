const UnsplashService = class {
    #Env = new Env();
    #API = 'https://api.unsplash.com';
    #OPTIONS = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.#Env.API_KEY
        }
    }
    constructor() { }
    async get(params) {
        const res = await fetch(`${this.#API}/search/photos?${params}`, this.#OPTIONS).then((res) => res.text()).then((res) => JSON.parse(res));
        return res;
    }

    async getImageById(id) {
        const res = await fetch(`${this.#API}/photos/${id}`, this.#OPTIONS).then((res) => res.text()).then((res) => JSON.parse(res));
        return res;
    }
}
