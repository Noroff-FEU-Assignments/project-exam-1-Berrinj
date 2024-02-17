export async function getComments(apiUrl) {
    try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
} catch (error) {
    console.error(`error ved henting av kommentarer:`, error);
    throw error;
    }
}