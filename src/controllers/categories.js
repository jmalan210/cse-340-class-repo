import {
    getCategories,
    getCategoryById,
    getProjectByCategory,
    getProjectCategories,
    updateCategoryAssignments
} from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";


const showCategoriesPage = async (req, res) => {
    const categories = await getCategories();
    // console.log(categories);
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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const allCategories = await getCategories();
    const projectCategories = await getProjectCategories(projectId);
    const title = 'Assign Categories to Project';
    res.render('assign-categories', { title, projectDetails, allCategories, projectCategories, projectId });
}

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArry = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArry);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
}
    export {
        showCategoriesPage,
        showCategoryDetailsPage, 
        showAssignCategoriesForm, 
        processAssignCategoriesForm
    }