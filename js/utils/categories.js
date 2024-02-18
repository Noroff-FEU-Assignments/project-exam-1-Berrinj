export async function getCategories(apiUrl) {
    try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
} catch (error) {
    throw error;
    }
}