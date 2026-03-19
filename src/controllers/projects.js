import { getAllProjects, getUpComingProjects, getProjectDetails } from '../models/projects.js'
// console.log('Projects controller loaded'); 
const NUMBER_OF_UPCOMING_PROJECTS = 5;

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
    const title = 'Project Details';
    res.render('project', { title, projectDetails });

    // console.log('Project details route hit');
}




export {showProjectsPage, showProjectDetailsPage}