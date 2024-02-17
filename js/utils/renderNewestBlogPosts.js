import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { getPosts } from "./posts.js";

export async function renderNewestBlogPosts() {
    let newPostList = await getPosts(FENTY_EMBED_API_URL);

    const newestBlogPostSection = document.querySelector(".new-blog-post-list ul");

    
    const postItemsHTML = newPostList.slice(0, 8).map((newPostItem) => {
        return `<a href="single-post.html?id=${newPostItem.id}"><li>${newPostItem.title.rendered}<p class="go-to-post">Les mer..</p></li></a>`;
    });

    newestBlogPostSection.innerHTML = "";

    newestBlogPostSection.innerHTML = postItemsHTML.join('');
}