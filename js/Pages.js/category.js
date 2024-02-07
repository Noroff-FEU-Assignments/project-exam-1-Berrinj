import { FENTY_CATEGORY_API_URL } from "../fetchAPI/categoriesAPI.js";
import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { getPosts } from "../utils/posts.js";
import { getCategories } from "../utils/categories.js";

const nav = document.querySelector(".main-menu");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerMenu.addEventListener("click", hamburgerMenuClick);

export function hamburgerMenuClick() {
    nav.classList.toggle("active")
}

const queryString = document.location.search;
export const params = new URLSearchParams(queryString);
export const categoryId = params.get("id");
const categoryName = params.get("categoryName")
document.title = `Fenty - Kategori - ${categoryName}`;

console.log(categoryId, categoryName);

const categoryNameHeader = document.querySelector(".news-and-content");
categoryNameHeader.innerHTML += `${categoryName}`;

async function renderCategoryPosts() {
    const getCategorys = await getCategories(`${FENTY_CATEGORY_API_URL}`);

    getCategorys.forEach((category) => {
        console.log(category.id, category.name);
    })
}
renderCategoryPosts() 

const blogPostContainer = document.querySelector(".blog-posts-category-container");

async function renderPostByCategoryCard() {

    const getCategoryData = await getPosts(`${FENTY_EMBED_API_URL}&categories=${categoryId}`);
    blogPostContainer.innerHTML = "";
    getCategoryData.forEach((post) => {
        const blogPostCard = createCategoryBlogPost(post);
        blogPostContainer.appendChild(blogPostCard);
});

}

function createCategoryBlogPost(post) {
    const blogPostCard = document.createElement(`div`);
    blogPostCard.dataset.postId = post.id;
    blogPostCard.classList.add(`blog-post-container`);
    const featuredMedia = post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] &&post._embedded['wp:featuredmedia'][0].source_url;
    const imageUrl = featuredMedia || '/img/RIHANNAnm.jpg';

    const textMaxLength = 120;

    blogPostCard.innerHTML += `<a href="single-post.html?id=${post.id}">
                                <img src="${imageUrl}" class="category-img">
                                <h2>${post.title.rendered}</h2>
                                <p>${truncateText(post.excerpt.rendered, textMaxLength)}</p>
                                </a>`;
        // headerImg.innerHTML = `${imageUrl}`;
        console.log(post.title.rendered);

        function truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        }
        return blogPostCard;

}
renderPostByCategoryCard()

