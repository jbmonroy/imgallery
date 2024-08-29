const SearchInput = class {
    #_searchService;
    #searchInput;
    $images;
    constructor(id, searchService) {
        this.#searchInput = document.getElementById(id);
        this.#_searchService = searchService;
    }

    onInit(next = (searchTerm)=>{}) {
        this.#searchInput.addEventListener('keyup', async (evt) => {
            if (evt.target.value.length >= 3) {
                this.$images = await this.#_searchService.get(`page=1&per_page=20&query=${evt.target.value}`)
                next(evt.target.value);
            }
        });
    }
}