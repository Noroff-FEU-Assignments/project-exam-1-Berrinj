import { FENTY_CATEGORY_API_URL } from "../fetchAPI/categoriesAPI.js";
import { FENTY_MEDIA_API_URL } from "../fetchAPI/mediaAPI.js";
import { getCategories } from "../utils/categories.js";
import { FENTY_EMBED_API_URL } from "../fetchAPI/embedAPI.js";
import { FENTY_COMMENTS_API_URL } from "../fetchAPI/commentsAPI.js";
import { FENTY_API_URL } from "../fetchAPI/baseAPI.js";
import { getPosts } from "./posts.js";
import { dataFromContentRendered } from "./reverseEngineerContentRendered.js";
import { getComments } from "./comments.js";



const queryString = document.location.search;
export const params = new URLSearchParams(queryString);
export const id = params.get("id");

const url =`${FENTY_API_URL}/${id}?_embed`;

const main = document.querySelector("main");
const mainContainer = document.querySelector(".single-blogpost-container");
const contentContainer = document.querySelector(".single-blogpost-content")


export async function getSinglePost() {
    try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    contentContainer.innerHTML = ``;
    document.title = `Fenty - Single post Page - ${result.title.rendered}`;
    const featuredMedia = result._embedded['wp:featuredmedia'] && result._embedded['wp:featuredmedia'][0] && result._embedded['wp:featuredmedia'][0].source_url;
    const imageUrl = featuredMedia || '/img/RIHANNAnm.jpg';

    

    const categoriesList = await getCategories(`${FENTY_CATEGORY_API_URL}?post=${id}`);
        const categoryName = categoriesList.length > 0 ? categoriesList[0].name : 'Uncategorized';
        const categoryURL = categoriesList[0].link;
        const categoryId = categoriesList.length > 0 ? categoriesList[0].id : `Undefined`;
        console.log(categoryId);

        const formattedDate = new Date(result.date).toLocaleDateString('nb-NO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
            const formattedTime = new Date(result.date).toLocaleTimeString('nb-NO', {
            hour: 'numeric',
            minute: 'numeric'
        });
   
        // <p><a href="${categoryURL}">${categoryName}</p></a>

    contentContainer.innerHTML = `<img class="main-post-img" src="${imageUrl}">
                                <div class="breadcrumbs">
                                    <p><a href="index.html">Hjem</a></p> / <p>${result.title.rendered}</p>
                                </div>
                                <h1>${result.title.rendered}</h1>
                                <div class="single-blog-post-info">
                                    <div class="author">
                                        <p><i class="fa-solid fa-pencil fa-2xs" style="color: #35423A;"></i> ${result._embedded.author[0].name}</p>
                                    </div>
                                    <div class="dateandtime">
                                        <p><i class="fa-regular fa-clock fa-2xs" style="color: #35423A;"></i> ${formattedDate} ${formattedTime}</p>
                                    </div>
                                    
                                </div>
                                <div class="single-blog-post-text">
                                    ${result.content.rendered}
                                </div>
                                <div class="gallery"></div>
                                <div class="category">
                                <p>Kategori: <a href="category.html?id=${categoryId}&categoryName=${categoryName}">${categoryName}</a></p>
                                </div>
                                <div id="go-back" onclick="history.back()">&larr; Gå tilbake</div>`;
                                // await example();
                                await modalClick();
                                // await modalImg();
                                galleryClassList()
                                // await imageSrc();
                                
    } catch(error) {
        main.innerHTML = `<div class="error">We are so sorry, an error occurred while loading this page.</div>`;
        console.log(error, `Sorry, an error occurred`);
    }
}
/* <div class="comments">
                                        <p>5 comments</p>
                                    </div> */
// export async function example() {
//     const post = await getPosts(`${FENTY_API_URL}/${id}/?_embed`);
//     const data = dataFromContentRendered(post.content.rendered);
//     console.log(data);
// }

function openModal(src, alt) {
    console.log('Clicked image:', src);
    console.log('Alt text:', alt);
    const dialog = document.querySelector("dialog");
    dialog.innerHTML = "";
    const fullSizeImage = document.createElement("img");
    fullSizeImage.src = src;
    fullSizeImage.alt = alt;

    dialog.appendChild(fullSizeImage);
    dialog.showModal();

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    fullSizeImage.addEventListener("click", () => {
        dialog.close();
      });
      
}

async function modalClick() {
    const imagesAPI = await getPosts(`${FENTY_API_URL}/${id}/?_embed`);
    const imgData = dataFromContentRendered(imagesAPI.content.rendered);
    console.log(imgData);

    const galleryContainer = document.querySelector('.wp-block-gallery');
    const singleImage = document.querySelector(`.wp-block-image`);

    const handleClick = (event) => {
        const img = event.target.closest('img');

        if (img && event.target === img) {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt');
            openModal(src, alt);
        }
    };

    if (galleryContainer) {
        galleryContainer.addEventListener('click', handleClick);
    }

    if (singleImage) {
        singleImage.addEventListener('click', handleClick);
    }
}
  
function galleryClassList() {
    const gallery = document.querySelectorAll(".wp-block-image");
    gallery.forEach((img) => {
        img.classList.add("single-post-gallery");
    })
    
}

const commentForm = document.getElementById("comment-form");
document.addEventListener("DOMContentLoaded", function() {
    
    commentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        handleCommentSubmitted();
    })
})

function handleCommentSubmitted() {
    const username = document.querySelector("#username");
    const comment = document.querySelector("#comment");

    if (validateInputs(username, comment)) {
        const usernameValue = document.querySelector("#username").value;
        const commentValue = document.querySelector("#comment").value;
        const commentData = {
            post: id,
            author_name: usernameValue,
            content: commentValue,
            author_email: `placeholderemail@example.no`,
        };
        commentForm.reset();
        console.log(commentData);
        submitCommentToWordPress(commentData);
    }
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorMessage = inputControl.querySelector(".form-error");
    // inputControl.classList.add("form-error");
    // inputControl.classList.remove("success");
    errorMessage.innerText = message;
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorMessage = inputControl.querySelector(".form-error");

    errorMessage.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("form-error");
}

function validateInputs(username, comment) {
    let isValid = true;
    const usernameTrim = username.value.trim();
    const commentTrim = comment.value.trim();

   if (usernameTrim.length < 3) {
        setError(username, "Navnet må være på 3 eller flere karakterer");
        isValid = false;
    } else {
        setSuccess(username);
    }
    if (commentTrim.length < 4) {
        setError(comment, "Kommentaren kan ikke være under 4 karakterer");
        isValid = false;
    } else {
        setSuccess(comment);
    }
    return isValid;
};

const commentContent = document.querySelector(".comment-content");
const noComment = document.querySelector(".no-comments");

async function fetchCommentsAndUpdateUI() {

    const comments = await getComments(`${FENTY_COMMENTS_API_URL}?post=${id}`);
    console.log(comments);

    updateCommentSection(comments);
}

function updateCommentSection(comments) {
    commentContent.innerHTML = '';

    if (comments.length === 0) {
        noComment.innerHTML = "Ingen kommentarer, vær den første!";
    }

    const commentsHeader = document.querySelector(".comments h4");
    commentsHeader.innerHTML = `Kommentarer (${comments.length})`;

    comments.forEach((comment) => {
        const formattedDate = new Date(comment.date).toLocaleDateString('nb-NO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        const formattedTime = new Date(comment.date).toLocaleTimeString('nb-NO', {
            hour: 'numeric',
            minute: 'numeric'
        });

        commentContent.innerHTML += `<div class="comment-card">
                                    <img class="commenter-avatar" src="${comment.author_avatar_urls[48]}">
                                    <div class="commenter-name">${comment.author_name}</div>
                                    <div class="comment-posted">${comment.content.rendered}</div>
                                    <div class="comment-date">${formattedDate} ${formattedTime}</div>
                                </div>`;
    });
}


async function displayComments() {
    const comments = await getComments(`${FENTY_COMMENTS_API_URL}?post=${id}`);
    console.log(comments);

    if(comments.length === 0) {
            noComment.innerHTML = "Ingen kommentarer, vær den første!";
        }

        const commentsHeader = document.querySelector(".comments h4");
        commentsHeader.innerHTML += ` (${comments.length})`;

    comments.forEach((comment) => {

          const formattedDate = new Date(comment.date).toLocaleDateString('nb-NO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
        const formattedTime = new Date(comment.date).toLocaleTimeString('nb-NO', {
        hour: 'numeric',
        minute: 'numeric'
    });

        commentContent.innerHTML += `<div class="comment-card">
                                    <img class="commenter-avatar" src="${comment.author_avatar_urls[48]}">
                                    <div class="commenter-name">${comment.author_name}</div>
                                    <div class="comment-posted">${comment.content.rendered}</div>
                                    <div class="comment-date">${formattedDate} ${formattedTime}</div
                                    </div>`                          
                                    
        console.log(comment.author_name, comment.content.rendered);
        
    })
}

displayComments();

const endpointURL = `https://fenty.berremarte.no/wp-json/wp/v2/comments?post=${id}`;
const commentOnHold = document.querySelector(".comment-on-hold");

function submitCommentToWordPress(commentData) {

    fetch(endpointURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Comment submitted successfully:', data);
            console.log(data.status);

            if (data.status === `hold` ) {
                commentOnHold.innerHTML = `Kommentaren din er til godkjenning.`;
            } else {
                commentOnHold.innerHTML = "";
            }
            fetchCommentsAndUpdateUI();
        })
        .catch(error => {
            console.error('Error submitting comment:', error);
        });
}

/* Credit to https://www.tetchi.ca/how-to-post-comments-using-the-wordpress-rest-api for helping me on the way to a working comment section! */