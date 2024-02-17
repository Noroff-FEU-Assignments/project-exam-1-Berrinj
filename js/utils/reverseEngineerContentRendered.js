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


export async function example() {
    const post = await getPosts(FENTY_EMBED_API_URL);
    post.forEach((postdata)=> {
    const data = dataFromContentRendered(postdata.content.rendered);
    return data;

    })
}