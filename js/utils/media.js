export async function getMedia(apiUrl) {
    try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
} catch (error) {
    throw error;
    }
}