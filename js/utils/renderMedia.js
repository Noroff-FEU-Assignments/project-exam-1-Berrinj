import { FENTY_MEDIA_API_URL } from "../fetchAPI/mediaAPI.js";
import { getMedia } from "./media.js";

export async function renderMedia() {
    try{
    let mediaFile = await getMedia(FENTY_MEDIA_API_URL);
    return mediaFile;
} catch (error) {
    throw error;
}
}