import { getProjectCategories } from '../models/categories.js';
import {
    getAllProjects,
    getUpComingProjects,
    getProjectDetails,
    createProject,
    updateProject
} from '../models/projects.js'
import {
    getAllOrganizations,
    updateOrganization
} from '../models/organizations.js';
import { body, validationResult } from 'express-validator';

// console.log('Projects controller loaded'); 
const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required.')
        .isLength({ min: 3, max: 200 })
        .withMessage('Title must be between 3 and 150 characters.'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters.'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ max: 200 })
        .withMessage('Location must be less than 200 characters.'),
    body('project_date')
        .notEmpty()
        .withMessage('Date is required.')
        .isISO8601()
        .withMessage('Date must be valid format.'),
    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required.')
        .isInt()
        .withMessage('Organization must be a valid integer.')
]
        

const showProjectsPage = async (req, res) => {
    // console.log('route hit');
    const upcomingProjects = await getUpComingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    // console.log(upcomingProjects);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, upcomingProjects });
};

const showProjectDetailsPage = async (req, res) => {
    const id = req.params.id;
    // console.log(id)
    const projectDetails = await getProjectDetails(id);
    // console.log(projectDetails);
    const categories = await getProjectCategories(id);
    const title = 'Project Details';
    res.render('project', { title, projectDetails, categories });

    // console.log('Project details route hit');
}


const showNewProjectForm = async (req, res) => {

    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';
    res.render('new-project', { title, organizations });

}

const processNewProjectForm = async (req, res) => {

     // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }
    const { title, description, location, project_date, organizationId } = req.body;

    try {

        const project = await createProject(title, description, location, project_date, organizationId);
    req.flash('New project successfully created!');
    res.redirect(`/project/${project}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
    
}

const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();

    const title = 'Edit Project';

    res.render('edit-project', { title, projectDetails, organizations });
    }

const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const { title, description, location, project_date, organizationId } = req.body;

   
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/edit-project/' + req.params.id);
    }
    await updateProject(title, description, location, project_date, organizationId, projectId);


    req.flash('success', 'Project updated successfully!');

    res.redirect(`/project/${projectId}`);


}


export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm, 
    processNewProjectForm, 
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
}