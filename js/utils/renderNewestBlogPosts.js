import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { getPosts } from "./posts.js";

let count = 0;

export async function renderNewestBlogPosts() {
    let newPostList = await getPosts(FENTY_EMBED_API_URL);

    const newestBlogPostSection = document.querySelector(".new-blog-post-list ul");

    newestBlogPostSection.innerHTML = "";

    newPostList.slice(0, 8).forEach((newPostItem) => {
        count++;
    newestBlogPostSection.innerHTML += `<a href="single-post.html?id=${newPostItem.id}"><li>${newPostItem.title.rendered}<p class="go-to-post">Les mer..</p></li></a>`;
    
});
}
// ${count}. 