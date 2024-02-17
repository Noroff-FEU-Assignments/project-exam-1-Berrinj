export async function getMedia(apiUrl) {
    try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
} catch (error) {
    console.error(`error ved henting av media:`, error);
    throw error;
    }
}