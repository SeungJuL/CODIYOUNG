import { pool } from "../database/db";
import { UserRequestBody } from "../types";


export class UserModel {
    static async findByUsername(username: string) {
        let result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result;
    }

    static async registerUser(userData: UserRequestBody) {
        let result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [userData.username, userData.password]);
        return result;
    }
}