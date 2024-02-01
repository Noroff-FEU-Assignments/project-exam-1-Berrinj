import { FENTY_EMBED_API_URL } from "./embedAPI.js";
import { getPosts } from "../utils/posts.js";
import { getCategories } from "../utils/categories.js";
import { renderMedia } from "../utils/renderMedia.js";
import { createBlogPost } from "../utils/createBlogPost.js";
import { renderNewestComments } from "../utils/renderComments.js";
import { renderNewestBlogPosts } from "../utils/renderNewestBlogPosts.js";
import { renderPostCarousel, handleLeftArrow, handleRightArrow } from "../utils/postCarousel.js";
import { loadMorePosts, getSelectedCategory, setSelectedCategory } from "../utils/loadMorePosts.js";
import { getComments } from "../utils/comments.js";
import { FENTY_COMMENTS_API_URL } from "./commentsAPI.js";
import { FENTY_CATEGORY_API_URL } from "./categoriesAPI.js";
import { dataFromContentRendered } from "../utils/reverseEngineerContentRendered.js";
import { sortPosts } from "../components/filterPosts.js";

const main = document.querySelector(`main`);
let loadMoreButton = document.querySelector(".load-more");


// export function createBlogPost(post) {

//     try {

//     const blogPostCard = document.createElement(`div`);
//     blogPostCard.dataset.postId = post.id;
//     blogPostCard.classList.add(`blog-post`);

//     // const featuredMedia = post._embedded['wp:featuredmedia']['0'].source_url
//     const featuredMedia = post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url;
//     const imageUrl = featuredMedia || '/img/RIHANNAnm.jpg';

//     const formattedDate = new Date(post.date).toLocaleDateString('nb-NO', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric'
// });
//     const formattedTime = new Date(post.date).toLocaleTimeString('nb-NO', {
//     hour: 'numeric',
//     minute: 'numeric'
// });


//     blogPostCard.innerHTML = `<div class="blog-post-header">
//                                 <div class="blog-date">
//                                     <h4>${formattedDate}</h4>
//                                 </div>
//                                 <div class="blog-post-header-img">
//                                     <img src="/img/post-top-image.png">
//                                 </div>
//                             </div>
                            
//                             <div class="blog-post-content">
//                                 <div class="blog-post-img-title">
//                                 <a href="single-post.html?id=${post.id}">
//                                     <img class="blog-post-main-img" src="${imageUrl}">
//                                     <h1 class="blog-post-title">${post.title.rendered}</h1></a>
//                                 </div>
//                                 <div class="blog-post-text">
//                                 ${post.content.rendered}
//                                 </div>
//                                 <div id="read-more"><a href="single-post.html?id=${post.id}">Gå til innlegg &rarr;</a></div>
//                             </div>
//                             <div class="blog-post-info">
//                                 <div class="author">
//                                     <p>Postet av: ${post._embedded.author[0].name}</p>
//                                 </div>
//                                 <div class="dateandtime">
//                                     <p>${formattedDate} ${formattedTime}</p>
//                                 </div>
//                                 <div class="comments">
//                                     <p> x kommentarer</p>
//                                 </div>
//                             </div>
//                     `;                                            
    
//     return blogPostCard;
//     } catch (error) {
//         main.innerHTML = `<div class="error">We are so sorry, an error occurred while loading this page.</div>`;
//         console.log(error, `Sorry, an error occurred`);
// }
// }


// let loadMoreButton = document.querySelector(".load-more");
const blogPostContainer = document.querySelector(".blog-posts-container");
let currentPage = 1;

// async function loadMorePosts(){
//     try {
//         currentPage++;
//         let morePosts = await getPosts(`${FENTY_EMBED_API_URL}&page=${currentPage}`);
//         console.log("New Post Data:", morePosts);
    
//         morePosts.forEach((post) => {
//         const blogPostCard = createBlogPost(post);
//         blogPostContainer.appendChild(blogPostCard);
        
//         });
//     if(morePosts.length === 0) {
//             loadMoreButton.disabled = true;
//         }
       
//     } catch (error) {
//         console.log(error, "Error loading more posts");
//     }
//     }

    // loadMoreButton.addEventListener("click", loadMorePosts);


//     loadMoreButton.addEventListener("click", function () {
//     const selectedCategory = getSelectedCategory();
//     loadMorePosts(selectedCategory);
// });

    let selectSortBy = document.querySelector("#filter-posts-by");
    selectSortBy.addEventListener("change", function() {
    const selectedCategory = selectSortBy.value;
    setSelectedCategory(selectedCategory);
    sortPosts();
    renderBlogPosts(selectedCategory);
});

export async function renderBlogPosts(selectedCategory = "All") {
    try{
    let blogPosts = await getPosts(`${FENTY_EMBED_API_URL}&page=${currentPage}`);
    // console.log("Post Data:", blogPosts);

    blogPosts = blogPosts.filter((post) => {
        const categoryIds = post.categories.map(String);
        return selectedCategory === "All" || categoryIds.includes(selectedCategory);

    });

    console.log("Filtered Posts:", blogPosts);
   

    blogPostContainer.innerHTML = "";

   blogPosts.forEach((post) => {
        const blogPostCard = createBlogPost(post);
        blogPostContainer.appendChild(blogPostCard);
});
 } catch (error) {
    console.log(error, "Sorry an error occurred");
 }

}

export async function example() {
    const post = await getPosts(FENTY_EMBED_API_URL);
    post.forEach((postdata)=> {
    const data = dataFromContentRendered(postdata.content.rendered);
    console.log(data);   
    })
}

// async function renderNewestBlogPosts() {
//     let newPostList = await getPosts(FENTY_EMBED_API_URL);

//     const newestBlogPostSection = document.querySelector(".new-blog-post-list ul");

//     newPostList.slice(0, 5).forEach((newPostItem) => {
//     newestBlogPostSection.innerHTML += `<li><a href="single-post.html?id=${newPostItem.id}">${newPostItem.title.rendered}</a></li>`;
//     });
    
   
// }

// async function renderNewestComments() {
//     const newCommentList = await getComments(FENTY_COMMENTS_API_URL);

//     const newestCommentSection = document.querySelector(".newest-comments ul");
//     newCommentList.slice(0, 5).forEach((newComment) => {
//     newestCommentSection.innerHTML += `<li><a href="single-post.html?id=${newComment.post}">${newComment.author_name} har kommentert: ${newComment.content.rendered}</li></a>`;

//     });
//     } 


    // let currentPostIndex = 0;
    // let displayPost;
    // const leftArrow = document.querySelector(".left-arrow");
    // const rightArrow = document.querySelector(".right-arrow");

// async function renderPostCarousel() {
//     const postCarousel = document.querySelector(".new-blog-post-carousel");
//     displayPost = await getPosts(`${FENTY_EMBED_API_URL}&per_page=5`);
//     const featuredMedia = displayPost[currentPostIndex]._embedded['wp:featuredmedia'] && displayPost[currentPostIndex]._embedded['wp:featuredmedia'][0] && displayPost[currentPostIndex]._embedded['wp:featuredmedia'][0].source_url;
//     const imageUrl = featuredMedia || '/img/RIHANNAnm.jpg';
//     postCarousel.innerHTML = `<a href="single-post.html?id=${displayPost[currentPostIndex].id}"><img class="carousel-img" src="${imageUrl}"> <p class="carousel-text">${displayPost[currentPostIndex].title.rendered}</p>`

//     updateArrowButtonStates();
// }

// function handleRightArrow() {
//     if (currentPostIndex < displayPost.length - 1) {
//         currentPostIndex++;
//         renderPostCarousel();
//     } else {
        
//     }
// }

// function handleLeftArrow() {
//     if (currentPostIndex > 0) {
//         currentPostIndex--;
//     } else {
//         currentPostIndex = 0;
//     }
//     renderPostCarousel();
// }

// function updateArrowButtonStates() {
//     leftArrow.classList.toggle('disabled-arrow', currentPostIndex === 0);
//     rightArrow.classList.toggle('disabled-arrow', currentPostIndex === displayPost.length - 1);
// }

// rightArrow.addEventListener("click", handleRightArrow);
// leftArrow.addEventListener("click", handleLeftArrow);




renderPostCarousel();
renderNewestComments()
renderNewestBlogPosts();
renderBlogPosts();
renderMedia();

