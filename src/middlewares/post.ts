import { Request, Response, NextFunction } from "express";
import { PostParams, PostRequestBody } from "../types";

export function validatePostRequest(req: Request<{}, any, PostRequestBody>, res: Response, next: NextFunction) {
     const { title, content } = req.body;
     if(typeof title !== 'string') {
        res.status(400).json("Invalid title");
        return;
     }
     if(typeof content !== 'string') {
        res.status(400).json("Invalid content");
        return;
     }
     next();
}

export function validatePostParams(req: Request<PostParams>, res: Response, next: NextFunction) {
    const postId = Number(req.params.id);
    if (isNaN(postId)) {
        res.status(400).json({ message: "Invalid post ID" });
        return;
    } else {
        next();
    }
}