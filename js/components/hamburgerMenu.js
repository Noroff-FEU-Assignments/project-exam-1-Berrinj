// const hamburgerMenu = document.querySelector(".hambuger-menu");
// const nav = document.querySelector(".main-menu");

// hamburgerMenu.addEventListener("click", () => {
//     nav.classList.toggle(".active")
// });

const nav = document.querySelector(".main-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerMenu.addEventListener("click", hamburgerMenuClick);

export function hamburgerMenuClick() {
    nav.classList.toggle("active")
}