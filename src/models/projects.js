import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT sp.project_id, sp.title, sp.description, sp.location, sp.project_date, o.name AS organization_name
      FROM public.service_projects AS sp
      JOIN public.organization AS o ON sp.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}
const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_projects
        WHERE organization_id = ${organizationId}
        ORDER BY project_date;
      `;
      
      const query_params = [organizationId];
      const result = await db.query(query, query_params);

      return result.rows;
};

const getUpComingProjects = async (number_of_projects) => {

  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date,
          organization_name
        FROM service_projects
        JOIN organization
        ON service_projects.organization_id = organization.organization_id
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
  
  const query_params = [number_of_projects];
  const result = await db.query(query, query_params);
  return result.rows;
};

const getProjectDetails = async (id) => {

  const query = `
  SELECT
          sp.project_id,
          sp.organization_id,
          sp.title,
          sp.description,
         sp.location,
          sp.project_date,
          o.name
        FROM service_projects
        JOIN organization o
        ON sp.organization_id = o.organization.organization_id
        WHERE organization_id = $1
`;
  
  const query_params = [id];
  const result = await db.query(query, query_params);
  return result.rows[0];
};
  

export {getAllProjects, getProjectsByOrganizationId, getUpComingProjects, getProjectDetails} 