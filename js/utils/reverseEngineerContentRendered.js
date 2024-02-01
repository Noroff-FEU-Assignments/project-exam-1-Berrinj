import { FENTY_API_URL } from "../fetchAPI/baseAPI.js";
import { FENTY_MEDIA_API_URL } from "../fetchAPI/mediaAPI.js";
import { getMedia } from "./media.js";
import { getPosts } from "./posts.js";
import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";


export function dataFromContentRendered(htmlContent) {
const parser = new DOMParser();
const html = parser.parseFromString(htmlContent, "text/html");

return html;
}

// export async function example() {
//     const post = await getPosts(FENTY_API_URL);
//     const data = dataFromContentRendered(post[0].content.rendered);
//     // console.log(data);
// }

export async function example() {
    const post = await getPosts(FENTY_EMBED_API_URL);
    post.forEach((postdata)=> {
    const data = dataFromContentRendered(postdata.content.rendered);
    // console.log(data);
    return data;
   
    // const galleryContainer = document.querySelector('.wp-block-gallery');
    // console.log(galleryContainer)
    // galleryContainer.slice(0, 3);
    })
}

// export async function imageSrc() {
//     try {
//         const media = await getMedia(`${FENTY_MEDIA_API_URL}?parent=${id}`);
//         if (media && media.length > 0) {

//             media.forEach((item) => {
//                 if (item.description && item.description.rendered) {
//                     const data = dataFromContentRendered(item.description.rendered);
//                     const images = data.querySelectorAll("img");

//                     images.forEach((image) => {
//                         console.log(image.src)
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