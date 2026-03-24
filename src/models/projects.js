import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT
        sp.project_id,
        sp.title,
        sp.description,
        sp.location,
        sp.project_date,
        o.name AS organization_name
      FROM public.service_projects AS sp
      JOIN public.organization AS o
      ON sp.organization_id = o.organization_id;
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
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const query_params = [organizationId];
      const result = await db.query(query, query_params);

      return result.rows;
};

const getUpComingProjects = async (number_of_projects) => {

  const query = `
        SELECT
          sp.project_id,
          sp.organization_id,
          sp.title,
          sp.description,
          sp.location,
          sp.project_date,
          o.name
        FROM service_projects AS sp
        JOIN organization AS o
        ON sp.organization_id = o.organization_id
        WHERE sp.project_date >= CURRENT_DATE
        ORDER BY sp.project_date
        LIMIT $1
      `;
  
  const query_params = [number_of_projects];
  const result = await db.query(query, query_params);
  // console.log(result.rows)
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
        FROM service_projects AS sp
        JOIN organization AS o
        ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1
`;
  
  const query_params = [id];
  const result = await db.query(query, query_params);
  // console.log(result.rows);
  return result.rows[0];
};

const createProject = async (title, description, location, date, organizationId) =>
{

    const query = `
    INSERT INTO service_projects (title, description, location, project_date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
    `;

    const query_params = [title, description, location, date, organizationId];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (title, description, location, project_date, organizationId, projectId) => {
  const query = `
    UPDATE service_projects
    SET title = $1, description = $2, location = $3, project_date = $4, organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const query_params = [title, description, location, project_date, organizationId, projectId];
  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', projectId);
  }

  return result.rows[0].projectId;
}
  

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpComingProjects,
  getProjectDetails,
  createProject, 
  updateProject
} 