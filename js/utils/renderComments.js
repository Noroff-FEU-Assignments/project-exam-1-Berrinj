import { getComments } from "./comments.js";
import { FENTY_COMMENTS_API_URL } from "../fetchAPI/commentsAPI.js";
import { getPostInfo } from "./getPostInfo.js";

export async function renderNewestComments() {
    try {
      const newCommentList = await getComments(FENTY_COMMENTS_API_URL);
  
      const newestCommentSection = document.querySelector(".newest-comments ul");
  
      for (const newComment of newCommentList.slice(0, 5)) {
        const postInfo = await getPostInfo(newComment.post);
        newestCommentSection.innerHTML += `<a href="single-post.html?id=${newComment.post}"><li><p class="comment-name">${newComment.author_name}</p> <p class="comment-info">har kommentert på ${postInfo.title.rendered}:</p> <div class="comment-content">${newComment.content.rendered}</div><p class="go-to-post">Se innlegg..</p></li></a>`;
      }
    } catch (error) {
      console.error('Error rendering newest comments:', error);
    }
  }



   export async function getCommentsNumber(post) {
        const commentsData = await getComments(`${FENTY_COMMENTS_API_URL}?post=${post.id}`);
        console.log(commentsData.length)
        // commentsData.forEach((comment) => {
        //    console.log(comment.author_name); 
        // })
        
        }