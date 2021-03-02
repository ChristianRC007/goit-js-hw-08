import gallery from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightboxRef: document.querySelector('.js-lightbox'),
  lightboxImgRef: document.querySelector('.lightbox__image'),
  lightboxBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

const originalImagesArray = gallery.map(el => el.original);
const descriptionsArray = gallery.map(el => el.description);

refs.galleryList.insertAdjacentHTML('afterbegin', galleryMarkup(gallery));

refs.galleryList.addEventListener('click', modalOpen);
refs.lightboxRef.addEventListener('click', modalClose);
refs.lightboxBtn.addEventListener('click', modalClose);
window.addEventListener('keydown', onKeyPressEvents);

function galleryMarkup(data) {
  return data.reduce((acc, { original, preview, description }) => {
    return (
      acc +
      `<li class="gallery__item">
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
    );
  }, '');
}

function modalOpen(e) {
  e.preventDefault();
  if (e.target.localName === 'img') {
    refs.lightboxRef.classList.add('is-open');
    refs.lightboxImgRef.src = e.target.dataset.source;
    refs.lightboxImgRef.alt = e.target.alt;
  }
}

function modalClose(e) {
  if (e.target.localName !== 'img') {
    toRemoveClassAndAttributes();
  }
}

function onKeyPressModalClose() {
  toRemoveClassAndAttributes();
}

function onKeyPressEvents(e) {
  if (e.key === 'Escape') {
    onKeyPressModalClose(e);
  }

  if (e.key === 'ArrowRight') {
    onRightKeyPress(e);
  }

  if (e.key === 'ArrowLeft') {
    onLeftKeyPress(e);
  }
}

function onRightKeyPress() {
  let currentImgIndex = originalImagesArray.indexOf(refs.lightboxImgRef.src);

  if (currentImgIndex + 1 > originalImagesArray.length - 1) {
    currentImgIndex = -1;
  }

  refs.lightboxImgRef.src = originalImagesArray[currentImgIndex + 1];
  refs.lightboxImgRef.alt = descriptionsArray[currentImgIndex + 1];
}

function onLeftKeyPress() {
  let currentImgIndex = originalImagesArray.indexOf(refs.lightboxImgRef.src);

  if (currentImgIndex - 1 < 0) {
    currentImgIndex = originalImagesArray.length;
  }

  refs.lightboxImgRef.src = originalImagesArray[currentImgIndex - 1];
  refs.lightboxImgRef.alt = descriptionsArray[currentImgIndex - 1];
}

function toRemoveClassAndAttributes() {
  refs.lightboxRef.classList.remove('is-open');
  refs.lightboxImgRef.src = '/';
  refs.lightboxImgRef.alt = '';
}

const fuck = 3;
const fix = '32132';
