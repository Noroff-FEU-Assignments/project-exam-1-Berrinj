import { getComments } from "./comments.js";
import { FENTY_COMMENTS_API_URL } from "../fetchAPI/commentsAPI.js";
import { getPostInfo } from "./getPostInfo.js";
const newestCommentSection = document.querySelector(".newest-comments ul");


export async function renderNewestComments() {
    try {
      const newCommentList = await getComments(FENTY_COMMENTS_API_URL);

      const commentItemsPromises = newCommentList.slice(0, 5).map(async (newComment) => {
        const postInfo = await getPostInfo(newComment.post);
        return `<li><a href="single-post.html?id=${newComment.post}"><p class="comment-name">${newComment.author_name}</p> <p class="comment-info">har kommentert på ${postInfo.title.rendered}:</p> <div class="comment-content">${newComment.content.rendered}</div><p class="go-to-post">Se innlegg..</p></a></li>`;
    });
    
      newestCommentSection.innerHTML = (await Promise.all(commentItemsPromises)).join('');

    } catch (error) {
      newestCommentSection.innerHTML = `<div class="error">En feil oppsto ved henting av kommentarer</div>`;
      console.error('Error henting av nye kommentarer:', error);
      throw error;
    }
  }


   export async function getCommentsNumber(post) {
    try {
        const commentsData = await getComments(`${FENTY_COMMENTS_API_URL}?post=${post.id}`);
        return commentsData.length;

        } catch (error) {
          console.error(`Error ved henting av kommentarer`, error);
          throw error;
        }
        }