const gallery = document.getElementById("gallery");
const loadMoreButton = document.getElementById("loadMore");
const clearGalleryButton = document.getElementById("clearGallery");
const removeLastButton = document.getElementById("removeLast");
const reverseGalleryButton = document.getElementById("reverseGallery");

let imageIds = new Set();

//  Picsum API
async function fetchImages(count = 4) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?limit=30`);
        const images = await response.json();
        // Фільтр
        const newImages = images.filter(image => !imageIds.has(image.id)).slice(0, count);
        return newImages;
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
}


async function loadImages(count = 4) {
    const images = await fetchImages(count);
    images.forEach(image => {
        imageIds.add(image.id);
        const imgElement = document.createElement("img");
        imgElement.src = `https://picsum.photos/id/${image.id}/150/150`;
        imgElement.alt = image.author;
        gallery.appendChild(imgElement);
    });
}


loadMoreButton.addEventListener("click", () => loadImages(4));

clearGalleryButton.addEventListener("click", () => {
    gallery.innerHTML = "";
    imageIds.clear();
});

removeLastButton.addEventListener("click", () => {
    if (gallery.lastChild) {
        const lastImg = gallery.lastChild;
        imageIds.delete(lastImg.alt);
        gallery.removeChild(lastImg);
    }
});

reverseGalleryButton.addEventListener("click", () => {
    const images = Array.from(gallery.children);
    gallery.innerHTML = "";
    images.reverse().forEach(image => gallery.appendChild(image));
});


loadImages();
