import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserTokenType } from "../types";

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) {
        return res.redirect('/user/login');
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY as string, (err, user) => {
        if (err) {
            return res.status(400).json({message: err.message});
        }
        req.user = user as UserTokenType;
        next();
    });
};