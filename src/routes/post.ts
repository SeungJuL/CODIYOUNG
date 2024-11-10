import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticateUser';
import { validatePostParams, validatePostRequest } from '../middlewares';
import {
    createPost, 
    deletePost, 
    getMyPosts, 
    getPost, 
    getPostList, 
    updatePost 
} from '../controllers';
export const router = Router();

router.route('/').get(getPostList).post(validatePostRequest, authenticateUser, createPost);

router.get('/my-list', authenticateUser, getMyPosts)

// id = postId
router.route('/:id',).get(validatePostParams, getPost)
    .put(validatePostRequest, authenticateUser, validatePostParams, updatePost)
    .delete(authenticateUser, validatePostParams, deletePost)
