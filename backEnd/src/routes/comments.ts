import express from 'express';
import { authenticateJWT } from '../middleware/Auth';
import { createComment, getCommentsByPostId, getCommentById, updateComment, deleteComment } from '../controller/comment';

const commentRouter = express.Router();
commentRouter.get('/:post_id/getComment', authenticateJWT, getCommentsByPostId); 
commentRouter.get('/getCommentById', authenticateJWT, getCommentById); 
commentRouter.post('/createComment', authenticateJWT, createComment); 
commentRouter.put('/:comment_id/updateComment', authenticateJWT, updateComment); 
commentRouter.delete('/:commentId/deleteComment', authenticateJWT, deleteComment); 
export default commentRouter;
