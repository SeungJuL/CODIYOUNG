import { Router, Request } from 'express';
import { UserRequestBody } from '../types';
import { validateUserRequest } from '../middlewares';
import { check, pool } from '../database/db';
import { ResponseUtil } from '../util/responseUtil';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const router = Router();


router.post('/register', validateUserRequest, async (req: Request<{}, any, UserRequestBody>, res) => {
    try {
        console.log(check)
        let duplicateResult = await pool.query('SELECT 1 FROM users WHERE username = $1', [req.body.username]);
        if (duplicateResult.rows.length > 0) {
            res.status(400).json(ResponseUtil.failure("User name already exist", null));
        } else {
            let hash = await bcrypt.hash(req.body.password, 10);
            const newUser = {
                username: req.body.username,
                password: hash
            };
            await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [newUser.username, newUser.password]);
            const responseUser = { username: newUser.username };
            res.status(200).json(ResponseUtil.success("User registered successfully", responseUser));
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json(ResponseUtil.error(err.message, null));
        } else {
            res.status(500).json(ResponseUtil.error("Unknown server error occured", null));
        }
    }
});

router.post('/login', async (req: Request<{}, any, UserRequestBody>, res) => {
    try {
        let userResult = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]);
        if (userResult.rowCount === 0) {
            res.status(400).json(ResponseUtil.failure("Username does not exist", null));
        } else {
            if (await bcrypt.compare(req.body.password, userResult.rows[0].password)) {
                const token = jwt.sign(
                    { id: userResult.rows[0].id, username: userResult.rows[0].username },
                    process.env.TOKEN_SECRET_KEY as string,
                    { expiresIn: '1h' }
                );
                res.status(200).json(ResponseUtil.success("Login success", token));
            } else {
                res.status(400).json(ResponseUtil.failure("Invalid password", null));
            }
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json(ResponseUtil.error(err.message, null))
        } else {
            res.status(500).json(ResponseUtil.error("Unknown server error occured", null))
        }
    }
});