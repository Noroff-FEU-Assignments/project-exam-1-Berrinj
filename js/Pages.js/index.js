
// import { hamburgerMenuClick } from "../components/hamburgerMenu.js";
// hamburgerMenuClick();

 /* Hamburger Menu  */
const nav = document.querySelector(".main-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerMenu.addEventListener("click", hamburgerMenuClick);

export function hamburgerMenuClick() {
    nav.classList.toggle("active")
}

switch (window.location.pathname) {
    case "/index.html":
        import("../fetchAPI/getPost.js").then((module) => {
           console.log('Loaded getPost.js'); 
        }) 
        break;
    case "/contact.html":
        case "/contact":
      import("./contact.js").then((module) => {
        // Do something with the imported module
        console.log('Loaded contact.js');
      });
      break;
    case "/category.html":
      import("./category.js").then((module) => {
        // Do something with the imported module
        console.log('Loaded category.js');
      });
      break;
    case "/single-post.html":
      import("./singlePost.js").then((module) => {
        // Do something with the imported module
        console.log('Loaded singlePost.js');
      });
      break;
    default:
      console.warn(`No script defined for the path: ${window.location.pathname}`);
  }