export async function getComments(apiUrl) {
    try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
} catch (error) {
    throw error;
    }
}