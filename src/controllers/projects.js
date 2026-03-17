import {getAllProjects} from '../models/projects.js'

const showProjectsPage = async (req, res) => {
    const service_projects = await getAllProjects();
    // console.log(service_projects);
    const title = 'Service Projects';
    res.render('projects', { title, service_projects });
};

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const query_params = [organizationId];
      const result = await db.query(query, query_params);

      return result.rows;
};

export {showProjectsPage, getProjectsByOrganizationId}