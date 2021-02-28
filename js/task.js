import gallery from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.gallery'),
}
const galleryMarkup = gallery.reduce((acc, {original, preview, description}) => {
 return acc + `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
}, '')

refs.galleryList.insertAdjacentHTML('afterbegin', galleryMarkup)