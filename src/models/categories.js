import db from './db.js'

const getCategories = async() => {
    const query = `
        SELECT name
        FROM categories
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getCategories} 