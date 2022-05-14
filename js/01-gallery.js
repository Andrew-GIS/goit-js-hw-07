import { galleryItems } from './gallery-items.js';
// Change code below this line
const gallery = document.querySelector('.gallery');
const galleryItemMarkup = createGalleryMarkup(galleryItems);
let modalWindow;
gallery.insertAdjacentHTML('beforeend', galleryItemMarkup);


function createGalleryMarkup(items) {
	return items.map(item => {
		 return `
		<div class="gallery__item">
  			<a class="gallery__link" href="${item.original}">
    			<img
     			class="gallery__image"
      			src="${item.preview}"
      			data-source=${item.original}
      			alt="${item.description}"
    			/>
  			</a>
		</div>`
	}).join("");
}

console.log(galleryItems);

gallery.addEventListener("click", onCardClick);

function onCardClick(event) {
	event.preventDefault();
	const galleryImageElement = event.target.classList.contains("gallery__image");
	if (!galleryImageElement) {
		console.log("return: click on image - you clicked on non-image field");
		return;
	}
	else {
		const urlSource = event.target.dataset.source;
		console.log('object :>> ', urlSource);
		modalWindow = basicLightbox.create(`
		<img src="${urlSource}"/>`, {
				onShow: () => gallery.addEventListener("keydown", onCloseAction),
				onClose: () => gallery.addEventListener("keydown", onCloseAction),
			});
			modalWindow.show();
	}
}

function onCloseAction(event) {
	if (event.code == "Escape")
		modalWindow.close();
}