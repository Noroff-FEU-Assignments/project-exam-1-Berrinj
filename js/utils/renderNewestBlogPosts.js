import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { getPosts } from "./posts.js";

const newestBlogPostSection = document.querySelector(".new-blog-post-list ul");

export async function renderNewestBlogPosts() {
    try {
    let newPostList = await getPosts(FENTY_EMBED_API_URL);

    
    const postItemsHTML = newPostList.slice(0, 8).map((newPostItem) => {
        return `<a href="single-post.html?id=${newPostItem.id}"><li>${newPostItem.title.rendered}<p class="go-to-post">Les mer..</p></li></a>`;
    });

    newestBlogPostSection.innerHTML = postItemsHTML.join('');
    
} catch (error) {
    newestBlogPostSection.innerHTML = `<div class="error">En feil oppsto ved henting av nye innlegg</div>`;
    console.error('Error ved hentign av nye innlegg:', error);
    throw error;
}
}