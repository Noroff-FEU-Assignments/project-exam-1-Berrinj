import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { getPosts } from "./posts.js";
import { createBlogPost } from "./createBlogPost.js";

let loadMoreButton = document.querySelector(".load-more");
const blogPostContainer = document.querySelector(".blog-posts-container");
let currentPage = 1;
loadMoreButton.addEventListener("click", loadMorePosts);

export async function loadMorePosts(){
    try {
        currentPage++;
        let morePosts = await getPosts(`${FENTY_EMBED_API_URL}&page=${currentPage}`);
        console.log("New Post Data:", morePosts);
    
        morePosts.forEach((post) => {
        const blogPostCard = createBlogPost(post);
        blogPostContainer.appendChild(blogPostCard);
        
        });
    if(morePosts.length < 10) {
            loadMoreButton.innerHTML = "No more posts";
            loadMoreButton.classList.remove("load-more-link");
            loadMoreButton.removeEventListener("click", loadMorePosts);
        }
       
    } catch (error) {
        console.log(error, "Error loading more posts");
    }
    }