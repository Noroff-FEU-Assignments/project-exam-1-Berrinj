export async function getComments(apiUrl) {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
    }