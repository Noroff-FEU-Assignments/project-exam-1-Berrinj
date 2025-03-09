const nav = document.querySelector(".main-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerMenu.addEventListener("click", hamburgerMenuClick);

export function hamburgerMenuClick() {
  nav.classList.toggle("active");
}

switch (window.location.pathname) {
  case "/index.html":
  case "/":
    import("../js/fetchAPI/getPost.js").then((module) => {});
    break;
  case "/contact.html":
  case "/contact":
    import("../js/pages/contact.js").then((module) => {});
    break;
  case "/category.html":
    import("../js/pages/category.js").then((module) => {});
    break;
  case "/single-post.html":
    import("../js/pages/singlePost.js").then((module) => {});
    break;
  default:
}
