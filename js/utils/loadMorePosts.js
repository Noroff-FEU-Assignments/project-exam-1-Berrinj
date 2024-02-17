import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { getPosts } from "./posts.js";
import { createBlogPost } from "./createBlogPost.js";

let loadMoreButton = document.querySelector(".load-more");
const blogPostContainer = document.querySelector(".blog-posts-container");
let currentPage = 1;
loadMoreButton.addEventListener("click", loadMorePosts);

export async function loadMorePosts() {
    try {
        currentPage++;
        const selectedCategory = getSelectedCategory();
        // let morePosts = await getPosts(`${FENTY_EMBED_API_URL}&page=${currentPage}&categories=${selectedCategory}`);
        let morePosts;

        if (selectedCategory !== "All") {
            morePosts = await getPosts(`${FENTY_EMBED_API_URL}&page=${currentPage}&categories=${selectedCategory}`);
        } else {
            morePosts = await getPosts(`${FENTY_EMBED_API_URL}&page=${currentPage}`);
        }
        

        console.log("New Post Data:", morePosts);
        

        if (morePosts.code === 'rest_post_invalid_page_number') {
            console.error("Invalid page number:", morePosts.message);
            disableLoadMoreButton();
            return;
        }

        if (morePosts.length === 0) {
            disableLoadMoreButton();
        } else {
            morePosts.forEach((post) => {
                const blogPostCard = createBlogPost(post);
                blogPostContainer.appendChild(blogPostCard);
            });

            if (morePosts.length < 10) {
                disableLoadMoreButton();
            }
        }
    } catch (error) {
        console.log(error, "Error loading more posts");
    }
}

function disableLoadMoreButton() {
    loadMoreButton.innerHTML = "Ingen flere innlegg";
    loadMoreButton.classList.remove("load-more-link");
    loadMoreButton.removeEventListener("click", loadMorePosts);
}

function enableLoadMoreButton() {
    loadMoreButton.innerHTML = "Last inn flere innlegg";
    loadMoreButton.classList.add("load-more-link");
    loadMoreButton.addEventListener("click", loadMorePosts);
}

let selectedCategory = "All";

export function getSelectedCategory() {
    return selectedCategory;
}

export function setSelectedCategory(category) {
    if (selectedCategory !== category) {
        selectedCategory = category;
        currentPage = 1;

        enableLoadMoreButton();
    }
}