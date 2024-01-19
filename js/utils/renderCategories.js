import { FENTY_CATEGORY_API_URL } from "../fetchAPI/categoriesAPI.js";
import { getCategories } from "./categories.js";

export async function renderCategories() {
    const catergoriesList = await getCategories(`${FENTY_CATEGORY_API_URL}`);
}