import { CustomError } from '../util/customError';

import { UserRequestBody } from '../types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models';

export class UserService {
    static async registerUser(userData: UserRequestBody) {
        let duplicateResult = await UserModel.findByUsername(userData.username);
        if (duplicateResult.rows.length > 0) {
            throw new CustomError("User name already exist", 400);
        }
        let hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash;

        const result = await UserModel.registerUser(userData);
        const responseUser = { id: result.rows[0].id, username: userData.username };

        return responseUser;
    }

    static async loginUser(userData: UserRequestBody) {
        let duplicateResult = await UserModel.findByUsername(userData.username);
        if (duplicateResult.rows.length === 0) {
            throw new CustomError("Username does not exist", 400);
        }
        if (await bcrypt.compare(userData.password, duplicateResult.rows[0].password)) {
            const token = jwt.sign(
                { id: duplicateResult.rows[0].id, username: duplicateResult.rows[0].username },
                process.env.TOKEN_SECRET_KEY as string,
                { expiresIn: '1h' }
            );
            return token;
        } else {
            throw new CustomError("Invalid password", 400);
        }
    }
}
