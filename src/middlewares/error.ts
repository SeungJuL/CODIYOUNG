import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "../util/responseUtil";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err.stack);
    const statuscode = res.statusCode ? res.statusCode : 500;
    if(statuscode === 400) {
        res.status(400).json(ResponseUtil.failure(err.message, null));
    } else {
        res.status(500).json({
        message: err.message
    });
    }
    
};
