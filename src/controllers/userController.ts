import { NextFunction, Request, Response } from "express";
import { UserRequestBody } from '../types';
import { ResponseUtil } from '../util/responseUtil';
import asyncHandler from 'express-async-handler';
import { UserService } from "../services";

//@desc Register User
//@route POST /api/user/register
//@access public
export const registerUser = asyncHandler(async (req: Request<{}, any, UserRequestBody>, res: Response, next: NextFunction) => {
    try {
        const responseUser = await UserService.registerUser(req.body);
        res.status(200).json(ResponseUtil.success("User registered successfully", responseUser));
    } catch (error) {
        next(error);
    }
});

//@desc Login User
//@route POST /api/user/login
//@access public
export const loginUser = asyncHandler(async (req: Request<{}, any, UserRequestBody>, res: Response, next: NextFunction) => {
    try {  
        const token = await UserService.loginUser(req.body);
        res.status(200).json(ResponseUtil.success("Login success", token));
    } catch(err) {
        next(err)
    }
});


