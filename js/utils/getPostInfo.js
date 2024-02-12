import { FENTY_API_URL } from "../fetchAPI/baseAPI.js";
import { getPosts } from "./posts.js";

export async function getPostInfo(postId) {
    const postInfo = await getPosts(`${FENTY_API_URL}/${postId}`);
    return postInfo;
    }