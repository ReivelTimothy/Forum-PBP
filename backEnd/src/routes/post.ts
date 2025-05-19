import express from 'express';
import {createPost, getAllPosts, getPostById, updatePost, deletePost, getPostContent, getPostTitle} from '../controller/post';
import { authenticateJWT } from '../middleware/Auth'; 

const postRouter = express.Router();

postRouter.get('', authenticateJWT, getAllPosts); // udah
postRouter.post('/CreatePost', authenticateJWT, createPost); // udah
postRouter.get('/getPostById', authenticateJWT, getPostById);  // udah
postRouter.put('/:postId/updatePost', authenticateJWT, updatePost); // udah 
postRouter.delete('/:postId/deletePost', authenticateJWT, deletePost); // udah
postRouter.get('/:postId/getPostContent', authenticateJWT, getPostContent); // udah
postRouter.get('/:postId/getPostTitle', authenticateJWT, getPostTitle); // udah

export default postRouter;


