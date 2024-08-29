const Main = class {
    #_unsplashService = new UnsplashService();
    #queryParams = new URLSearchParams(window.location.search);
    #_modal = new Modal();;
    #_searchInputService;
    #_cardsService = new Cards();

    constructor() {
        this.onInit();
    }

    onInit() {
        window.addEventListener('load', () => {
            this.#_searchInputService = new SearchInput('searchInput', this.#_unsplashService);
            this.#_searchInputService.onInit((searchTerm) => {
                this.updateQueryParams({ filter: searchTerm });
                this.#_cardsService.flushCards();
                this.#_cardsService.flushCards('.notFound');
                this.setContainer(this.#_cardsService.setImages(this.#_searchInputService.$images));
            })
            this.searchByQueryParams(this.#queryParams);
            this.viewNavElements(this.#queryParams);
            this.viewContainerElements();
        });
    }

    async searchImages(page, per_page, query) {
        this.#_cardsService.flushCards();
        const $images = await this.#_unsplashService.get(`page=${page}&per_page=${per_page}&query=${query}`);
        this.setContainer(this.#_cardsService.setImages($images));
    }

    async searchImageById(id) {
        const $image = await this.#_unsplashService.getImageById(id);
        this.#_modal.onInit($image);
    }

    setContainer(fragment) {
        const container = document.getElementById('container');
        container.appendChild(fragment);
        return container;
    }

    viewContainerElements(){
        const container = document.getElementById('container');
        container.addEventListener('click',(evt)=>{
            if(evt.target.parentNode.dataset.imageId || evt.target.dataset.imageId){
                this.searchImageById(evt.target.parentNode.dataset.imageId || evt.target.dataset.imageId);
            }
        });
    }

    viewNavElements(params) {
        const menu = document.getElementById('menu');
        menu.addEventListener('click', (evt) => {
            evt.preventDefault();
            if (evt.target.tagName.toLowerCase() != 'a') {
                return;
            }
            const { textContent } = evt.target;
            params.set('filter', textContent.toLowerCase());
            history.replaceState({}, "", `${window.location.pathname}?${params}`);
            this.searchByQueryParams(params);
        });
    }

    searchByQueryParams(params) {
        if (params.has('filter')) {
            this.searchImages(1, 20, params.get('filter'))
            return;
        }
        this.searchImages(1, 20, 'web');
    }

    updateQueryParams(values) {
        this.#queryParams.set('filter', values.filter);
        history.replaceState({}, '', `${window.location.pathname}?${this.#queryParams}`);
    }


}

const app = new Main();