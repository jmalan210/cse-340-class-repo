import db from './db.js'

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        insert into users (name, email, password_hash, role_id)
        values ($1, $2, $3, (select role_id FROM roles where role_name = $4))
        returning user_id
    `;

    const query_params = [name, email, passwordHash, default_role];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

export { createUser };