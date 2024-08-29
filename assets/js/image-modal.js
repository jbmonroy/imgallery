const Modal = class {
    #data;
    template
    constructor() {}
    onInit(data) {
        this.#data = data;
        this.template = `
            <div class="modal">
                <div class="content-wrapper">
                    <img src="${this.#data.urls.regular}" alt="${this.#data.alt_description}">
                    <div class="user-info">
                        <button class="close">&times;</button>
                        <div class="thumb">
                            <img src="${this.#data.user.profile_image.medium}" alt="Imágen de perfíl del creador">
                        </div>
                        <a href="https://instagram.com/${this.#data.user.instagram_username || ''}"
                            target="_blank">
                            <i class="uil uil-instagram"></i>
                            ${this.#data.user.instagram_username || this.#data.user.username} 
                        </a>
                    </div>
                </div>
                <div class="modal-info">
                    <div class="other">
                        <span class="likes-counter">${this.#data.likes} likes</span>
                    </div>
                    <p class="date">${new Date(this.#data.created_at).toDateString()}</p>
                    <div class="info-container">
                        <p class="description"><strong>Equipo:</strong> ${this.#data.exif.model}</p>
                        <p class="description"><strong>Exposición:</strong> ${this.#data.exif.exposure_time}</p>
                        <p class="description"><strong>Apertura:</strong> ${this.#data.exif.aperture}</p>
                        <p class="description"><strong>Distancia focal:</strong> ${this.#data.exif.focal_length}</p>
                        <p class="description"><strong>ISO:</strong> ${this.#data.exif.iso}</p>
                    </div>
                </div>
            </div>
            `;
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        modalContainer.innerHTML = this.template;
        modalContainer.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('close')) {
                this.onClose();
            }
        })
        document.body.appendChild(modalContainer);
    }

    onClose() {
        const modal = document.querySelector('.modal-container');
        document.body.removeChild(modal);
    }
}