import { FENTY_EMBED_API_URL } from "./embedAPI.js";
import { getPosts } from "../utils/posts.js";
import { renderMedia } from "../utils/renderMedia.js";
import { renderCategories } from "../utils/renderCategories.js";

const main = document.querySelector(`main`);

function createBlogPost(post) {

    try {

    const blogPostCard = document.createElement(`div`);
    blogPostCard.dataset.postId = post.id;
    blogPostCard.classList.add(`blog-post`);


    // const featuredMedia = post._embedded['wp:featuredmedia']['0'].source_url
    const featuredMedia = post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url;
    const imageUrl = featuredMedia || '/img/RIHANNAnm.jpg';


    blogPostCard.innerHTML = `<div class="blog-post-header">
                                <div class="blog-date">
                                    <h4>${post.date}</h4>
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
                                ${post.content.rendered}</div>
                            </div>
                            <div class="blog-post-info">
                                <div class="author">
                                    <p>Posted by: ${post._embedded.author[0].name}</p>
                                </div>
                                <div class="dateandtime">
                                    <p>January 16th 2024 15:45</p>
                                </div>
                                <div class="comments">
                                    <p>5 comments</p>
                                </div>
                            </div>
                    `;                                            
    
    return blogPostCard;
    } catch (error) {
        main.innerHTML = `<div class="error">We are so sorry, an error occurred while loading this page.</div>`;
        console.log(error, `Sorry, an error occurred`);
}
}

export async function renderBlogPosts() {
    let blogPosts = await getPosts(FENTY_EMBED_API_URL); 
    console.log("Post Data:", blogPosts);

    const blogPostContainer = document.querySelector(".blog-posts-container");
    blogPostContainer.innerHTML = "";

   blogPosts.forEach((post) => {
    const blogPostCard = createBlogPost(post);
    blogPostContainer.appendChild(blogPostCard);
    console.log(post.id);
    console.log(post.title);
}); 

}
async function renderNewestBlogPosts() {
    let newPostList = await getPosts(FENTY_EMBED_API_URL);
    console.log("Post List:", newPostList);

    const newestBlogPostSection = document.querySelector(".new-blog-post-list ul");

    newPostList.slice(0, 5).forEach((newPostItem) => {
    newestBlogPostSection.innerHTML += `<li><a href="single-post.html?id=${newPostItem.id}">${newPostItem.title.rendered}</a></li>`;
    });
    
   
}



renderNewestBlogPosts();

renderBlogPosts();
renderMedia();
