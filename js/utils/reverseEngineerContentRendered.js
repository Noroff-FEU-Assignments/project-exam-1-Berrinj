import { FENTY_API_URL } from "../fetchAPI/baseAPI.js";
import { getPosts } from "./posts.js";

export function dataFromContentRendered(htmlContent) {
const parser = new DOMParser();
const html = parser.parseFromString(htmlContent, "text/html");
return html;
}

export async function example() {
    const post = await getPosts(FENTY_API_URL);
    const data = dataFromContentRendered(post[0].content.rendered);
    console.log(data);
}

