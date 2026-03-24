import db from './db.js'

const getCategories = async() => {
    const query = `
        SELECT name, category_id
        FROM categories
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (id) => {
    const query = `
    SELECT 
    name,
    category_id
    from categories
    where category_id = $1
    `;

    const query_params = [id];
    const result = await db.query(query, query_params);
    return result.rows;
}

const getProjectCategories = async (project_id) => {
    const query = `
    SELECT
    sp.project_id,
    sp.organization_id,
    sp.title,
    sp.description,
    sp.location,
    sp.project_date,
    c.name,
    c.category_id
    FROM service_projects AS sp
    JOIN service_project_categories as spc
    ON sp.project_id = spc.project_id
    JOIN categories as c
    ON c.category_id = spc.category_id
    WHERE sp.project_id = $1
    ORDER BY c.name

     `;
    
    const query_params = [project_id];
    const result = await db.query(query, query_params);
    return result.rows;
}

const getProjectByCategory = async (category_id) => {
    const query = `
    SELECT
    sp.project_id,
    sp.organization_id,
    sp.title,
    sp.description,
    sp.location,
    sp.project_date,
    c.name
    FROM service_projects AS sp
    JOIN service_project_categories as spc
    ON sp.project_id = spc.project_id
    JOIN categories as c
    ON c.category_id = spc.category_id
    WHERE spc.category_id = $1 AND sp.project_date >= CURRENT_DATE
    ORDER BY sp.project_date
    `;
    const query_params = [category_id];
    const result = await db.query(query, query_params);
    return result.rows;
}

const assignCategoryToProject = async (projectId, categoryId) => {
    const query =
        `INSERT into service_project_categories
        VALUES ($1, $2);
    `;

    await db.query(query, [projectId, categoryId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
   DELETE from service_project_categories 
    WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId)
    }

    
}

const addCategory = async (name) => {
        const query = `
    INSERT INTO categories(name)
        VALUES($1)
    returning category_id;
    `;
        
        const query_params = [name];
        const result = await db.query(query, query_params);

        return result.rows[0].category_id;
}

const editCategory = async (category_id, name) => {
    const query = `
    UPDATE categories set name = $1
    WHERE category_id = $2
    RETURNING category_id, name;
    `;

    const query_params = [name, category_id];
    const result = await db.query(query, query_params);
    return result.rows[0];
}

export {
    getCategories,
    getCategoryById,
    getProjectCategories,
    getProjectByCategory,
    updateCategoryAssignments, 
    addCategory, 
    editCategory
} 