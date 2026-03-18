import { getAllProjects, getUpComingProjects, getProjectDetails } from '../models/projects.js'

const NUMBER_OF_UPCOMING_PROJECTS = 3;

const showProjectsPage = async (req, res) => {
    // const service_projects = await getAllProjects();
    const upcomingProjects = await getUpComingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    // console.log(service_projects);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, upcomingProjects });
};

const showProjectDetailsPage = async (req, res) => {
    const id = req.params.id;
    console.log('--- HIT ROUTE ---');
    console.log('ID:', id);
    const projectDetails = await getProjectDetails(id);
    const title = 'Project Details';
    res.render('project', {title, projectDetails})
}




export {showProjectsPage, showProjectDetailsPage}