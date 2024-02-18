/*This file is in the wrong folder, but trying to move it made my soul leave the body so it stays for now */ 
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
        } else {
            blogPosts = await getPosts(`${FENTY_EMBED_API_URL}&categories=${selectedCategory}`);
        }

        blogPostContainer.innerHTML = "";

        const blogPostCard = blogPosts.map((post) => createBlogPost(post));
            blogPostContainer.append(...blogPostCard);

    } catch (error) {
        blogPostContainer.innerHTML = `<div class="error">Beklager, en feil oppsto mens innleggene skulle lastes inn.</div>`
        console.error("Beklager en feil oppsto:", error);
        throw error;
    }
}

export async function example() {
    try {
    const post = await getPosts(FENTY_EMBED_API_URL);
    post.forEach((postdata)=> {
    const data = dataFromContentRendered(postdata.content.rendered);
    return data;   
    });
    } catch (error) {
        console.error(error);
        throw error;
    }
}



renderPostCarousel();
renderNewestComments()
renderNewestBlogPosts();
renderBlogPosts();
renderMedia();

