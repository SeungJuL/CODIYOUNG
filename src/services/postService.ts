import { PostModel } from '../models';
import { Post } from '../types';
import { CustomError } from '../util/customError';

export class PostService {
    static async getAllPosts() {
        return (await PostModel.getAllPosts()).rows;
    }

    static async createPost(postData: Post, timestamp: number, userId: number) {
        const result = await PostModel.createPost(postData, timestamp, userId);
        if (result.rows.length === 0) {
            throw new CustomError("Fail to insert the post", 400);
        }
        return result.rows[0];
    }

    static async getPost(id: number) {
        const result = await PostModel.getPostById(id);
        if (result.rows.length === 0) {
            throw new CustomError("Fail to load the post", 400);
        }
        return result.rows[0];
    }

    static async updatePost(postData: Post, id: number, userId: number) {
        // get current post
        const postResult = await PostModel.getPostById(id);
        if (postResult.rows.length === 0) {
            throw new CustomError("Fail to load the post", 400);
        } else {
            // check the author
            if (Number(postResult.rows[0].fk_user) === userId) {
                const result = await PostModel.updatePost(postData, id);
                return result.rows[0];
            } else {
                throw new CustomError("Only the author can update the post", 400);
            }
        }
    }

    static async deletePost(id: number, userId: number) {
        const postResult = await PostModel.getPostById(id);
        if (postResult.rows.length === 0) {
            throw new CustomError("Fail to load the post", 400)
        } else {
            // check the author
            if (Number(postResult.rows[0].fk_user) === userId) {
                const result = await PostModel.deletePost(id);
                return result.rows[0];
            } else {
                throw new CustomError("Only the author can delete the post", 400)
            }
        }
    }

    static async getMyPosts(userId: number) {
        const result = await PostModel.getAllPostByUserId(userId);
        return result.rows;
    }

}