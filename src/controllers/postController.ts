import { NextFunction, Request, Response } from 'express';
import { ResponseUtil } from '../util/responseUtil';;
import { PostParams, PostRequestBody } from '../types';
import asyncHandler from 'express-async-handler';
import { PostService } from '../services/postService';

/**
 * @desc Get all the post list
 * @route GET /api/post/
 * @access public
 */

export const getPostList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => { // get all the post list
    try{
       let postResult = await PostService.getAllPosts()
    res.status(200).json(ResponseUtil.success("Success loadiing all the posts", postResult)) 
    } catch(err) {
        next(err);
    }
    
});

/**
 * @desc Create the post
 * @route POST /api/post/
 * @access private
 */
export const createPost = asyncHandler(async (req: Request<{}, any, PostRequestBody>, res: Response, next: NextFunction) => { // upload the post
    try {
        let insertResult = await PostService.createPost(req.body, Number(req.timestamp), Number(req.user?.id));
        res.status(200).json(ResponseUtil.success("Success inserting the post", insertResult));
    } catch(err) {
        next(err);
    }
});

/**
 * @desc Get the post
 * @route GET /api/post/:id
 * @access public
 */

export const getPost = asyncHandler(async (req: Request<PostParams>, res: Response, next: NextFunction) => {
    try {
        let postResult = await PostService.getPost(Number(req.params.id));
        res.status(200).json(ResponseUtil.success("Success loading the post", postResult));
    } catch(err) {
        next(err);
    }    
});

/**
 * @desc Update the post
 * @route PUT /api/post/:id
 * @access private
 */

export const updatePost = asyncHandler(async (req: Request<PostParams, any, PostRequestBody>, res: Response, next: NextFunction) => { // update the post
    try{
        let updateResult = await PostService.updatePost(req.body, Number(req.params.id), Number(req.user?.id));
        res.status(200).json(ResponseUtil.success("Success updating the post", updateResult));
    } catch(err) {
        next(err);
    }
});

/**
 * @desc Delete the post
 * @route DELETE /api/post/
 * @access private
 */

export const deletePost = asyncHandler(async (req: Request<PostParams>, res: Response, next: NextFunction) => {
    try{
        let deleteResult = await PostService.deletePost(Number(req.params.id), Number(req.user?.id));
        res.status(200).json(ResponseUtil.success("Success deleting the post", deleteResult));
    } catch(err) {
        next(err);
    }
});

/**
 * @desc Get the post that specific user posted
 * @route GET /api/post/my-list
 * @access private
 */

export const getMyPosts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let postResult = await PostService.getMyPosts(Number(req.user?.id));
        res.status(200).json(ResponseUtil.success("Success loading posts", postResult));
    } catch(err) {
        next(err);
    }
});