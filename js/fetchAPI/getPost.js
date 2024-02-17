import { FENTY_EMBED_API_URL } from "./embedAPI.js";
import { getPosts } from "../utils/posts.js";
import { renderMedia } from "../utils/renderMedia.js";
import { createBlogPost } from "../utils/createBlogPost.js";
import { renderNewestComments } from "../utils/renderComments.js";
import { renderNewestBlogPosts } from "../utils/renderNewestBlogPosts.js";
import { renderPostCarousel } from "../utils/postCarousel.js";
import { setSelectedCategory } from "../utils/loadMorePosts.js";

import { dataFromContentRendered } from "../utils/reverseEngineerContentRendered.js";
import { sortPosts } from "../components/filterPosts.js";

const main = document.querySelector(`main`);
const blogPostContainer = document.querySelector(".blog-posts-container");
let currentPage = 1;

let selectSortBy = document.querySelector("#filter-posts-by");
selectSortBy.addEventListener("change", function() {
const selectedCategory = selectSortBy.value;
setSelectedCategory(selectedCategory);
sortPosts(selectedCategory);
renderBlogPosts(selectedCategory);
});

let selectSortByMobile = document.querySelector("#filter-posts-by-mobile");
selectSortByMobile.addEventListener("change", function() {
const selectedCategoryMobile = selectSortByMobile.value;
setSelectedCategory(selectedCategoryMobile);
sortPosts(selectedCategoryMobile);
renderBlogPosts(selectedCategoryMobile);
});

export async function renderBlogPosts(selectedCategory = "All") {
    try {
        let blogPosts;
        if (selectedCategory === "All") {
            blogPosts = await getPosts(`${FENTY_EMBED_API_URL}&page=${currentPage}`);
            console.log("All Post Data:", blogPosts);
        } else {
            blogPosts = await getPosts(`${FENTY_EMBED_API_URL}&categories=${selectedCategory}`);
            console.log("Filtered Posts:", blogPosts);
        }

        blogPostContainer.innerHTML = "";

        blogPosts.forEach((post) => {
            const blogPostCard = createBlogPost(post);
            blogPostContainer.appendChild(blogPostCard);
        });
    } catch (error) {
        console.log(error, "Sorry, an error occurred");
    }
}

export async function example() {
    const post = await getPosts(FENTY_EMBED_API_URL);
    post.forEach((postdata)=> {
    const data = dataFromContentRendered(postdata.content.rendered);
    console.log(data);   
    })
}

const nav = document.querySelector(".main-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerMenu.addEventListener("click", hamburgerMenuClick);

export function hamburgerMenuClick() {
    nav.classList.toggle("active")
}



renderPostCarousel();
renderNewestComments()
renderNewestBlogPosts();
renderBlogPosts();
renderMedia();

