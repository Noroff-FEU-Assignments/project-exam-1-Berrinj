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
           console.log('Loaded getPost.js'); 
        }) 
        break;
    case "/contact.html":
        case "/contact":
      import("../js/Pages.js/contact.js").then((module) => {
        console.log('Loaded contact.js');
      });
      break;
    case "/category.html":
      import("../js/Pages.js/category.js").then((module) => {
        console.log('Loaded category.js');
      });
      break;
    case "/single-post.html":
      import("../js/Pages.js/singlePost.js").then((module) => {
        console.log('Loaded singlePost.js');
      });
      break;
    default:
      console.warn(`No script defined for the path: ${window.location.pathname}`);
  }