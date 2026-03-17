import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js'
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
};

const getOrganizationDetails = async (organizationId) => {
      const query = `
      SELECT
        organization_id,
        name,
        description,
        contact_email,
        logo_filename
      FROM organization
      WHERE organization_id = $1;
    `;

      const query_params = [organizationId];
      const result = await db.query(query, query_params);

      // Return the first row of the result set, or null if no rows are found
      return result.rows.length > 0 ? result.rows[0] : null;
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', {title, organizationDetails, projects});
};

export {showOrganizationsPage, getOrganizationDetails, showOrganizationDetailsPage}