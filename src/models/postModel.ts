import { pool } from "../database/db";
import { Post } from "../types";

export class PostModel {
    static async getAllPosts() {
        const result = await pool.query("SELECT id, title FROM posts");
        return result;
    }

    static async createPost(postData: Post, timestamp:number, userId: number) {
        const result = await pool.query("INSERT INTO posts(title, content, timestamp, fk_user) VALUES($1, $2, $3, $4) RETURNING *",
            [postData.title, postData.content, timestamp, userId]);
        return result;
    }

    static async getPostById(id: number) {
        const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        return result;
    }

    static async updatePost(postData: Post, id: number) {
        const result = await pool.query("UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *", [postData.title, postData.content, id]);
        return result;
    }

    static async deletePost(id: number) {
        const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
        return result;
    }

    static async getAllPostByUserId(userId: number) {
        const result = await pool.query("SELECT * FROM posts WHERE fk_user = $1", [userId]);
        return result;
    }
}