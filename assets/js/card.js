const Cards = class {
    setImages($images) {
        const imagesFragment = document.createDocumentFragment();
        if ($images.results.length == 0) {
            const legend404 = document.createElement('p');
            legend404.classList.add('notFound');
            legend404.textContent = 'Sin resultados';
            legend404.tabIndex = 0;
            return legend404;
        }
        $images.results.map((data) => {
            imagesFragment.appendChild(this.setCards(data));
        });
        return imagesFragment;
    }

    setCards(data) {
        const card = document.createElement('div');
        const img = document.createElement('img');
        card.classList.add('card');
        img.src = data.urls.thumb;
        img.tabIndex = 0;
        img.alt = data.alternative_slugs.es;
        img.loading = "lazy";
        card.appendChild(img);
        card.dataset.imageId = data.id;
        return card;
    }

    flushCards(querySelector = '.card') {
        try {
            const cards = document.querySelectorAll(querySelector);
            cards.forEach((card) => {
                card.parentNode.removeChild(card);
            });
        } catch (e) { }
    }
}