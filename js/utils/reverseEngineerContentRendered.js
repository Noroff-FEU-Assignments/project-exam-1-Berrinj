import { getPosts } from "./posts.js";
import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";


export function dataFromContentRendered(htmlContent) {
const parser = new DOMParser();
const html = parser.parseFromString(htmlContent, "text/html");

return html;
}


export async function example() {
    try {
    const post = await getPosts(FENTY_EMBED_API_URL);
    post.forEach((postdata)=> {
    const data = dataFromContentRendered(postdata.content.rendered);
    return data;
    });
} catch (error) {
    throw error;
}
}