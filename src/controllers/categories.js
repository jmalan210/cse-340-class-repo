import { getCategories, getCategoryById, getProjectByCategory, getProjectCategories } from "../models/categories.js";

const showCategoriesPage = async (req, res) => {
    const categories = await getCategories();
    console.log(categories);
    const title = "Categories";
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const projects = await getProjectByCategory(categoryId);
    const categories = await getCategoryById(categoryId);
    const category = categories[0];
    const title = category.name;
    res.render('category', { title, category, projects });
}

export {showCategoriesPage, showCategoryDetailsPage}