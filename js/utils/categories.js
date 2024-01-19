export async function getCategories(apiUrl) {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
    }