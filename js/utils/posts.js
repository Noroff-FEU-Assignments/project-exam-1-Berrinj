export async function getPosts(apiUrl) {
    try{
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
} catch (error) {
    throw error;
    }
}