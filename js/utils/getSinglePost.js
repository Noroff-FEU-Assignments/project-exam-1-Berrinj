import { FENTY_CATEGORY_API_URL } from "../fetchAPI/categoriesAPI.js";
import { FENTY_MEDIA_API_URL } from "../fetchAPI/mediaAPI.js";
import { getCategories } from "../utils/categories.js";
import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { FENTY_API_URL } from "../fetchAPI/baseAPI.js";
import { getPosts } from "./posts.js";
import { dataFromContentRendered } from "./reverseEngineerContentRendered.js";



const queryString = document.location.search;
export const params = new URLSearchParams(queryString);
export const id = params.get("id");

const url =`${FENTY_API_URL}/${id}?_embed`;

const main = document.querySelector("main");
const mainContainer = document.querySelector(".single-blogpost-container");
const contentContainer = document.querySelector(".single-blogpost-content")


export async function getSinglePost() {
    try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    contentContainer.innerHTML = ``;
    document.title = `Fenty - Single post Page - ${result.title.rendered}`;
    const featuredMedia = result._embedded['wp:featuredmedia'] && result._embedded['wp:featuredmedia'][0] && result._embedded['wp:featuredmedia'][0].source_url;
    const imageUrl = featuredMedia || '/img/RIHANNAnm.jpg';

    

    const categoriesList = await getCategories(`${FENTY_CATEGORY_API_URL}?post=${id}`);
        const categoryName = categoriesList.length > 0 ? categoriesList[0].name : 'Uncategorized';
        const categoryURL = categoriesList[0].link;
        const categoryId = categoriesList.length > 0 ? categoriesList[0].id : `Undefined`;
        console.log(categoryId);

        const formattedDate = new Date(result.date).toLocaleDateString('nb-NO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
            const formattedTime = new Date(result.date).toLocaleTimeString('nb-NO', {
            hour: 'numeric',
            minute: 'numeric'
        });
   
        // <p><a href="${categoryURL}">${categoryName}</p></a>

    contentContainer.innerHTML = `<img class="main-post-img" src="${imageUrl}">
                                <div class="breadcrumbs">
                                    <p><a href="index.html">Home</a></p> / <p>${result.title.rendered}</p>
                                </div>
                                <h1>${result.title.rendered}</h1>
                                <div class="single-blog-post-info">
                                    <div class="author">
                                        <p>Posted by: ${result._embedded.author[0].name}</p>
                                    </div>
                                    <div class="dateandtime">
                                        <p>${formattedDate} ${formattedTime}</p>
                                    </div>
                                    
                                </div>
                                <div class="single-blog-post-text">
                                    ${result.content.rendered}
                                </div>
                                <div class="gallery"></div>
                                <div class="category">
                                <p>Kategori: <a href="category.html?id=${categoryId}&categoryName=${categoryName}">${categoryName}</a></p>
                                </div>
                                <div id="go-back" onclick="history.back()">&larr; Gå tilbake</div>`;
                                // await example();
                                await modalClick();
                                // await modalImg();
                                galleryClassList()
                                // await imageSrc();
                                
    } catch(error) {
        main.innerHTML = `<div class="error">We are so sorry, an error occurred while loading this page.</div>`;
        console.log(error, `Sorry, an error occurred`);
    }
}
/* <div class="comments">
                                        <p>5 comments</p>
                                    </div> */
// export async function example() {
//     const post = await getPosts(`${FENTY_API_URL}/${id}/?_embed`);
//     const data = dataFromContentRendered(post.content.rendered);
//     console.log(data);
// }
function openModal(src, alt) {
    console.log('Clicked image:', src);
    console.log('Alt text:', alt);
    const dialog = document.querySelector("dialog");
    dialog.innerHTML = "";
    const fullSizeImage = document.createElement("img");
    fullSizeImage.src = src;
    fullSizeImage.alt = alt;

    dialog.appendChild(fullSizeImage);
    dialog.showModal();
    fullSizeImage.addEventListener("click", () => {
        dialog.close();
      });
}

async function modalClick() {
    const imagesAPI = await getPosts(`${FENTY_API_URL}/${id}/?_embed`);
    const imgData = dataFromContentRendered(imagesAPI.content.rendered);
    console.log(imgData);

    const galleryContainer = document.querySelector('.wp-block-gallery');

    if(galleryContainer) {
          galleryContainer.addEventListener('click', (event) => {
        const img = event.target.closest('img');

        if (img && event.target === img) {

            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt');
            openModal(src, alt);
        }
    });
    }

}
  
function galleryClassList() {
    const gallery = document.querySelectorAll(".wp-block-image");
    gallery.forEach((img) => {
        img.classList.add("single-post-gallery");
    })
    
}


// export async function imageSrc() {
//     try {
//         const media = await getMedia(`${FENTY_MEDIA_API_URL}?parent=${id}`);
//         if (media && media.length > 0) {

//             media.forEach((item) => {
//                 if (item.description && item.description.rendered) {
//                     const data = dataFromContentRendered(item.description.rendered);
//                     const images = data.querySelectorAll("a");

//                     images.forEach((image) => {
//                         const gallery = document.querySelector(".gallery")
//                         gallery.innerHTML += `<div class="gallery-image thumbnail"><img src="${image.href}"</div>`
                        
//                         console.log(image.href)
//                     });
//                 } else {
//                     console.error("Media not found for item:", item);
//                 }
//             });
//         } else {
//             console.error("No media found.");
//         }
        
//     } catch (error) {
//         console.error("Error fetching media:", error);
//     }
// }