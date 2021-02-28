import gallery from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightboxRef: document.querySelector('.js-lightbox'),
  lightboxImgRef: document.querySelector('.lightbox__image'),
  lightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
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
  
refs.galleryList.addEventListener('click', modalOpen);
refs.lightboxRef.addEventListener('click', modalClose);
refs.lightboxBtn.addEventListener('click', modalClose);
window.addEventListener('keydown', onKeyPressModalClose)
  
function modalOpen(e) {
e.preventDefault();
  if (e.target.localName === 'img') {
    refs.lightboxRef.classList.add('is-open')
    refs.lightboxImgRef.src = e.target.dataset.source
    refs.lightboxImgRef.alt = e.target.alt
  }
}

function modalClose(e) {
  if (e.target.localName !== 'img') {
    refs.lightboxRef.classList.remove('is-open')
    refs.lightboxImgRef.src = '/'
    refs.lightboxImgRef.alt = ''
  }
}

function onKeyPressModalClose(e) {
  if (e.key === 'Escape') {
    refs.lightboxRef.classList.remove('is-open')
    refs.lightboxImgRef.src = '/'
    refs.lightboxImgRef.alt = ''
  }
}

