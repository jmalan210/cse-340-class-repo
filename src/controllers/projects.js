import {getAllProjects} from '../models/projects.js'

const showProjectsPage = async (req, res) => {
    const service_projects = await getAllProjects();
    // console.log(service_projects);
    const title = 'Service Projects';
    res.render('projects', { title, service_projects });
};



export {showProjectsPage}