import db from './db.js'
import bcrypt from 'bcrypt';
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

const findUserByEmail = async (email) => {
    const query = `
        select user_id, name, email, password_hash, role_id
        from users
        where email = $1
    `;

    const query_params = [email];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        return null;
    
    }
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null;
    }

    const passwordCorrect = await verifyPassword(password, user.password_hash);
    if (passwordCorrect) {
        user.password_hash = null;
        return user;

    } return null;
};
    export { createUser, authenticateUser};