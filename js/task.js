import gallery from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightboxRef: document.querySelector('.js-lightbox'),
  lightboxImgRef: document.querySelector('.lightbox__image'),
  lightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
}


const originalImagesArray = gallery.map(el => el.original);
const descriptionsArray = gallery.map(el => el.description);
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
window.addEventListener('keydown', onKeyPressEvents)

  
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

function onKeyPressEvents(e) {
  onKeyPressModalClose(e)
  onRightKeyPress(e)
  onLeftKeyPress(e)
}

function onRightKeyPress(e) {
  while (refs.lightboxRef.classList.contains('is-open')) {
    if (e.key === 'ArrowRight') {
      let indexOfCurrentImg = originalImagesArray.indexOf(refs.lightboxImgRef.src);
       if (indexOfCurrentImg + 1 > originalImagesArray.length - 1) {
        indexOfCurrentImg = -1
      }
      refs.lightboxImgRef.src = originalImagesArray[indexOfCurrentImg + 1]
      refs.lightboxImgRef.alt = descriptionsArray[indexOfCurrentImg + 1]
    }
    break
  }
}

function onLeftKeyPress(e) {
  while (refs.lightboxRef.classList.contains('is-open')) {
    if (e.key === 'ArrowLeft') {
      let indexOfCurrentImg = originalImagesArray.indexOf(refs.lightboxImgRef.src);
      if (indexOfCurrentImg - 1 < 0) {
        indexOfCurrentImg = originalImagesArray.length
      }
      refs.lightboxImgRef.src = originalImagesArray[indexOfCurrentImg - 1]
      refs.lightboxImgRef.alt = descriptionsArray[indexOfCurrentImg - 1]
    }
    break
  }
}