const nav = document.querySelector(".main-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerMenu.addEventListener("click", hamburgerMenuClick);

export function hamburgerMenuClick() {
    nav.classList.toggle("active")
}

switch (window.location.pathname) {
    case "/index.html":
        case "/":
        import("../js/fetchAPI/getPost.js").then((module) => {
        }) 
        break;
    case "/contact.html":
        case "/contact":
      import("../js/Pages.js/contact.js").then((module) => {
      });
      break;
    case "/category.html":
      import("../js/Pages.js/category.js").then((module) => {
      });
      break;
    case "/single-post.html":
      import("../js/Pages.js/singlePost.js").then((module) => {
      });
      break;
    default:
  }