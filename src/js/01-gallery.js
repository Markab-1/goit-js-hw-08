// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector(".gallery");

const galleryMarkup = galleryItems.map(createItemGallery).join("");

galleryRef.insertAdjacentHTML('beforeend',galleryMarkup);

new SimpleLightbox('.gallery a',
        {
            close: true,
            animationSpeed: 250,
            captionsData: "alt",
            captionDelay: 250,
        });


function createItemGallery(item) {
        return `
    <a class="gallery__item" href="${item.original}">
    <img class="gallery__image"
    src="${item.preview}" 
    alt="${item.description}" />
    </a>
        ` ;  
}