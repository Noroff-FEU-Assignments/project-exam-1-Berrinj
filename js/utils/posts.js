export async function getPosts(apiUrl) {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
    }