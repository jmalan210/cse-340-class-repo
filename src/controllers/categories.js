import { getCategories } from "../models/categories.js";

const showCategoriesPage = async (req, res) => {
    const categories = await getCategories();
    console.log(categories);
    const title = "Categories";
    res.render('categories', { title, categories });
};

export {showCategoriesPage}