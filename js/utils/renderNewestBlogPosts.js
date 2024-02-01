import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { getPosts } from "./posts.js";

export async function renderNewestBlogPosts() {
    let newPostList = await getPosts(FENTY_EMBED_API_URL);

    const newestBlogPostSection = document.querySelector(".new-blog-post-list ul");

    newPostList.slice(0, 5).forEach((newPostItem) => {
    newestBlogPostSection.innerHTML += `<li><a href="single-post.html?id=${newPostItem.id}">${newPostItem.title.rendered}</a></li>`;
    
});
}
