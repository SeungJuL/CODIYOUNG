import { Request, Router } from 'express';
import { pool } from '../database/db';
import { ResponseUtil } from '../util/responseUtil';
import { authenticateUser } from '../middlewares/authenticateUser';
import { PostParams, PostRequestBody } from '../types';
import { validatePostParams, validatePostRequest } from '../middlewares';
export const router = Router();


router.route('/').get(async (req, res) => { // get all the post list
    try {
        let postResult = await pool.query("SELECT id, title FROM posts");
        res.status(200).json(ResponseUtil.success("Success loadiing all the posts", postResult.rows))
    } catch(err) {
        if (err instanceof Error) {
            res.status(500).json(ResponseUtil.error(err.message, null));
        } else {
            res.status(500).json(ResponseUtil.error("Unknown server error occured", null));
        }
    }
}).post(validatePostRequest, authenticateUser, async (req: Request<{}, any, PostRequestBody>, res) => { // upload the post
    try {
        let insertResult = await pool.query("INSERT INTO posts(title, content, timestamp, fk_user) VALUES($1, $2, $3, $4) RETURNING *", 
            [req.body.title, req.body.content, req.timestamp, req.user?.id]);
        if(insertResult.rows.length === 0) {
            res.status(400).json(ResponseUtil.failure("Fail to insert the post", null));
        } else {
            res.status(200).json(ResponseUtil.success("Success inserting the post", insertResult.rows[0]));
        }
    } catch(err) {
        if (err instanceof Error) {
            res.status(500).json(ResponseUtil.error(err.message, null));
        } else {
            res.status(500).json(ResponseUtil.error("Unknown server error occured", null));
        }
    }
});

router.get('/my-list', authenticateUser ,async (req: Request, res) => {
    try {
        let postResult = await pool.query("SELECT * FROM posts WHERE fk_user = $1", [req.user?.id]);
        res.status(200).json(ResponseUtil.success("Success loading posts", postResult.rows));
    } catch(err) {
        if (err instanceof Error) {
            res.status(500).json(ResponseUtil.error(err.message, null));
        } else {
            res.status(500).json(ResponseUtil.error("Unknown server error occured", null));
        }
    }
})

// id = postId
router.route('/:id',).get(validatePostParams, async (req, res) => {
    try {
        let postResult = await pool.query("SELECT * FROM posts WHERE id = $1", [Number(req.params.id)]);
        if(postResult.rows.length === 0) {
            res.status(400).json(ResponseUtil.failure("Fail to load the post", null));
        } else {
            res.status(200).json(ResponseUtil.success("Success loading the post", postResult.rows[0]));
        }
    } catch(err) {
        if (err instanceof Error) {
            res.status(500).json(ResponseUtil.error(err.message, null));
        } else {
            res.status(500).json(ResponseUtil.error("Unknown server error occured", null));
        }
    }
}).put(validatePostRequest, authenticateUser, validatePostParams, async (req: Request<PostParams, any, PostRequestBody>, res) => { // update the post
    try {
        // get current post
        let postResult = await pool.query("SELECT * FROM posts WHERE id = $1", [Number(req.params.id)]); 
        if (postResult.rows.length === 0) {
            res.status(400).json(ResponseUtil.failure("Fail to load the post", null));
        } else {
            // check the author
            if(Number(postResult.rows[0].fk_user) === Number(req.user?.id)) {
                let updateResult = await pool.query("UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *", [req.body.title, req.body.content, Number(req.params.id)]);
                res.status(200).json(ResponseUtil.success("Success updating the post", updateResult.rows[0]));
            } else {
                res.status(400).json(ResponseUtil.failure("Only the author can update the post", null));
            }
        }
    } catch(err) {
        if (err instanceof Error) {
            res.status(500).json(ResponseUtil.error(err.message, null));
        } else {
            res.status(500).json(ResponseUtil.error("Unknown server error occured", null));
        }
    }
}).delete(authenticateUser, validatePostParams, async (req: Request<PostParams>, res) => {
    try{
        let postResult = await pool.query("SELECT * FROM posts WHERE id = $1", [Number(req.params.id)]); 
        if (postResult.rows.length === 0) {
            res.status(400).json(ResponseUtil.failure("Fail to load the post", null));
        } else {
            // check the author
            if(Number(postResult.rows[0].fk_user) === Number(req.user?.id)) {
                let deleteResult = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [Number(req.params.id)]);
                res.status(200).json(ResponseUtil.success("Success deleting the post", deleteResult.rows[0]));
            } else {
                res.status(400).json(ResponseUtil.failure("Only the author can delete the post", null));
            }   
        }
    } catch(err) {
        if (err instanceof Error) {
            res.status(500).json(ResponseUtil.error(err.message, null));
        } else {
            res.status(500).json(ResponseUtil.error("Unknown server error occured", null));
        }
    }
})
