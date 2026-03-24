import {
    getCategories,
    getCategoryById,
    getProjectByCategory,
    getProjectCategories,
    updateCategoryAssignments, 
    addCategory
} from "../models/categories.js";
import { getAllProjects, getProjectDetails } from "../models/projects.js";
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category is required.')
        .isLength({ min: 3, max: 200 })
        .withMessage('Category must be between 3 and 200 characters.'),
    
];


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

const showAddCategoryForm = async (req, res) => {
    const categories = await getCategories();
   
    const title = "Add New Category";
    res.render('new-category', { title, categories,});
}

const processAddCategoryForm = async (req, res) => {

   // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-category');
    }

    const { name } = req.body;
    try {

        const category = await addCategory(name);
    req.flash('New category successfully added!');
    res.redirect(`/category/${category}`);
    } catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/categories');
    }
    


}
    export {
        showCategoriesPage,
        showCategoryDetailsPage, 
        showAssignCategoriesForm, 
        processAssignCategoriesForm,
        showAddCategoryForm, 
        processAddCategoryForm, 
        categoryValidation
    }