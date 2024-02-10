import { example } from "./reverseEngineerContentRendered.js";
import { getCategories } from "./categories.js";
import { FENTY_CATEGORY_API_URL } from "../fetchAPI/categoriesAPI.js";
import { getComments } from "./comments.js";
import { FENTY_COMMENTS_API_URL } from "../fetchAPI/commentsAPI.js";

export function createBlogPost(post) {

    try {

    const blogPostCard = document.createElement(`div`);
    blogPostCard.dataset.postId = post.id;
    blogPostCard.classList.add(`blog-post`);
    // const featuredMedia = post._embedded['wp:featuredmedia']['0'].source_url
    const featuredMedia = post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url;
    const imageUrl = featuredMedia || '/img/RIHANNAnm.jpg';

    const formattedDate = new Date(post.date).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});
//     const formattedTime = new Date(post.date).toLocaleTimeString('nb-NO', {
//     hour: 'numeric',
//     minute: 'numeric'
// });
async function getCommentsNumber() {
    try {
        const commentsData = await getComments(`${FENTY_COMMENTS_API_URL}?post=${post.id}`);

        const main = document.querySelector("main");
        if (main) {
        blogPostCard.innerHTML = `<div class="blog-post-header">
                                    <div class="blog-date">
                                        <h4>${formattedDate}</h4>
                                    </div>
                                    <div class="blog-post-header-img">
                                        <img src="/img/post-top-image.png">
                                    </div>
                                </div>
                                
                                <div class="blog-post-content">
                                    <div class="blog-post-img-title">
                                    <a href="single-post.html?id=${post.id}">
                                        <img class="blog-post-main-img" src="${imageUrl}">
                                        <h1 class="blog-post-title">${post.title.rendered}</h1></a>
                                    </div>
                                    <div class="blog-post-text">
                                    ${post.excerpt.rendered}
                                    </div>
                                    <div id="read-more"><a href="single-post.html?id=${post.id}">Les mer.. &rarr;</a></div>
                                </div>
                                <div class="blog-post-info">
                                    <div class="author">
                                        <p>Postet av: ${post._embedded.author[0].name}</p>
                                    </div>
                                    <div class="dateandtime">
                                        <p>Kommentarer: ${commentsData.length}</p>
                                    </div>
                                </div>
                        `;   
                }
            } catch (error) {
                console.log(error, "Error getting comments");
            }
        }

        getCommentsNumber();

    return blogPostCard;
    } catch (error) {
        if (main) {
        main.innerHTML = `<div class="error">We are so sorry, an error occurred while loading this page.</div>`;
    }
        console.log(error, `Sorry, an error occurred`);
        return null;
}
}

example();