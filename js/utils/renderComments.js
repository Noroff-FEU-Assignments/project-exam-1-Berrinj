import { getComments } from "./comments.js";
import { FENTY_COMMENTS_API_URL } from "../fetchAPI/commentsAPI.js";

// async function renderComments() {
//     const commentData = await getComments(FENTY_COMMENTS_API_URL);
//     const commentId = commentData.id;
//     console.log(commentId);
// }
export async function renderNewestComments() {
    const newCommentList = await getComments(FENTY_COMMENTS_API_URL);

    const newestCommentSection = document.querySelector(".newest-comments ul");
    newCommentList.slice(0, 5).forEach((newComment) => {
    newestCommentSection.innerHTML += `<li><a href="single-post.html?id=${newComment.post}">${newComment.author_name} har kommentert: ${newComment.content.rendered}</li></a>`;

    });
    } 