import { Request, Response, NextFunction } from "express";
import { UserRequestBody } from "../types";

export function  validateUserRequest(req: Request<{}, any, UserRequestBody>, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    if(typeof username !== 'string') {
        res.status(400).json({ message: "Invalid username" });
        return;
    }
    if(typeof password !== 'string') {
        res.status(400).json({ message: "Invalid password" });
        return;
    }
    if(password.length < 8) {
        res.status(400).json({ message: "Password must be at least 8 characters long" });
        return;
    }
    next();
}