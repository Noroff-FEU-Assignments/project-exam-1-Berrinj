import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { FENTY_API_URL } from "../fetchAPI/baseAPI.js";
import { FENTY_CATEGORY_API_URL } from "../fetchAPI/categoriesAPI.js";
import { getCategories } from "../utils/categories.js";

const queryString = document.location.search;
export const params = new URLSearchParams(queryString);
export const id = params.get("id");

const url =`${FENTY_API_URL}/${id}?_embed`;
console.log(url);
const main = document.querySelector("main");
const mainContainer = document.querySelector(".main-container");

async function getSinglePost() {
    try {
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);

    mainContainer.innerHTML = ``;
    document.title = `Fenty - Single post Page - ${result.title.rendered}`;
    const featuredMedia = result._embedded['wp:featuredmedia'] && result._embedded['wp:featuredmedia'][0] && result._embedded['wp:featuredmedia'][0].source_url;
    const imageUrl = featuredMedia || '/img/RIHANNAnm.jpg';

    const categoriesList = await getCategories(`${FENTY_CATEGORY_API_URL}?post=${id}`);
        const categoryName = categoriesList.length > 0 ? categoriesList[0].name : 'Uncategorized';
        const categoryURL = categoriesList[0].link;

    mainContainer.innerHTML = `<img class="main-post-img" src="${imageUrl}">
                                <div class="breadcrumbs">
                                    <p><a href="index.html">Home</a></p> / <p><a href="${categoryURL}">${categoryName}</p></a> / <p>${result.title.rendered}</p>
                                </div>
                                <h1>${result.title.rendered}</h1>
                                <div class="single-blog-post-info">
                                    <div class="author">
                                        <p>Posted by: ${result._embedded.author[0].name}</p>
                                    </div>
                                    <div class="dateandtime">
                                        <p>January 16th 2024 15:45</p>
                                    </div>
                                    <div class="comments">
                                        <p>5 comments</p>
                                    </div>
                                </div>
                                <div class="single-blog-post-text">
                                    ${result.content.rendered}
                                </div>
                                <div class="category">
                                    <p>Category: ${categoryName} </p>
                                </div>`;


    } catch(error) {
        main.innerHTML = `<div class="error">We are so sorry, an error occurred while loading this page.</div>`;
        console.log(error, `Sorry, an error occurred`);
    }
}



getSinglePost();