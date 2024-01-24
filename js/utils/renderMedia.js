import { FENTY_MEDIA_API_URL } from "../fetchAPI/mediaAPI.js";
import { getMedia } from "./media.js";

export async function renderMedia() {
    let mediaFile = await getMedia(FENTY_MEDIA_API_URL);
    console.log("Media Data:", mediaFile);
}