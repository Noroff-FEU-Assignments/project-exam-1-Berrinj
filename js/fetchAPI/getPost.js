import { FENTY_EMBED_API_URL } from "./embedAPI.js";
import { getPosts } from "../utils/posts.js";
import { renderMedia } from "../utils/renderMedia.js";
import { FENTY_COMMENTS_API_URL } from "./commentsAPI.js";
import { getComments } from "../utils/comments.js";
// import { renderCategories } from "../utils/renderCategories.js";

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
                                ${post.content.rendered}
                                </div>
                                <div id="read-more"><a href="single-post.html?id=${post.id}">Gå til innlegg &rarr;</a></div>
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


let loadMoreButton = document.querySelector(".load-more");
const blogPostContainer = document.querySelector(".blog-posts-container");
let currentPage = 1;

async function loadMorePosts(){
    try {
        currentPage++;
        let morePosts = await getPosts(`${FENTY_EMBED_API_URL}&page=${currentPage}`);
        console.log("New Post Data:", morePosts);
    
        morePosts.forEach((post) => {
        const blogPostCard = createBlogPost(post);
        blogPostContainer.appendChild(blogPostCard);
         
        });
    if(morePosts.length === 0) {
            loadMoreButton.disabled = true;
        }
       
    } catch (error) {
        console.log(error, "Error loading more posts");
    }
    }

    loadMoreButton.addEventListener("click", loadMorePosts);


export async function renderBlogPosts() {
    try{
    let blogPosts = await getPosts(`${FENTY_EMBED_API_URL}&page=${currentPage}`);
    console.log("Post Data:", blogPosts);

    blogPostContainer.innerHTML = "";

   blogPosts.forEach((post) => {
    const blogPostCard = createBlogPost(post);
    blogPostContainer.appendChild(blogPostCard);
    console.log(post.id);
    console.log(post.title);
});
 } catch (error) {
    console.log(error, "Sorry an error occurred");
 }

}


async function renderNewestBlogPosts() {
    let newPostList = await getPosts(FENTY_EMBED_API_URL);

    const newestBlogPostSection = document.querySelector(".new-blog-post-list ul");

    newPostList.slice(0, 5).forEach((newPostItem) => {
    newestBlogPostSection.innerHTML += `<li><a href="single-post.html?id=${newPostItem.id}">${newPostItem.title.rendered}</a></li>`;
    });
    
   
}

async function renderNewestComments() {
    const newCommentList = await getComments(FENTY_COMMENTS_API_URL);

    const newestCommentSection = document.querySelector(".newest-comments ul");
    newCommentList.slice(0, 5).forEach((newComment) => {
    newestCommentSection.innerHTML += `<li><a href="single-post.html?id=${newComment.post}">${newComment.author_name} har kommentert: ${newComment.content.rendered}</li></a>`;
  
    });
    }  

async function renderPostCarousel() {
    const postCarousel = document.querySelector(".new-blog-post-carousel");
    const displayPost = await getPosts(FENTY_EMBED_API_URL);
    const featuredMedia = displayPost[6]._embedded['wp:featuredmedia'] && displayPost[6]._embedded['wp:featuredmedia'][0] && displayPost[6]._embedded['wp:featuredmedia'][0].source_url;
    const imageUrl = featuredMedia || '/img/RIHANNAnm.jpg';
    postCarousel.innerHTML = `<img class="carousel-img" src="${imageUrl}"> <p class="carousel-text">${displayPost[6].title.rendered}</p>`
}


renderPostCarousel();


renderNewestComments()
renderNewestBlogPosts();

renderBlogPosts();
renderMedia();

