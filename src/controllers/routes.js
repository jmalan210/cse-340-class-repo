
import express from 'express';
import { showHomePage } from './index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage
} from './projects.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage
} from './categories.js';
import { testErrorPage } from './errors.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);

//Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);


// error-handling routes
router.get('/test-error', testErrorPage);

export default router;