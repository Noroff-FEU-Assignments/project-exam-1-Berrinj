// function onLightboxClick(event) {
//     const src = event.target.src;
//     const alt = event.target.alt;
//     openDialog();
// }

// export function lightbox(src, alt) {
// const img = document.createElement("img");
// img.src = src;
// img.alt = alt;
// img.addEventListener("click", onLightboxClick);
// return img;
// }
export function openDialog() {
    const dialog = document.querySelector("dialog");
    dialog.innerHTML = "";
    const fullSizeImage = document.createElement("img");
    fullSizeImage.src = src;
    fullSizeImage.alt = alt;

    // Append the img element to the dialog
    dialog.appendChild(fullSizeImage);
    dialog.showModal();
}
