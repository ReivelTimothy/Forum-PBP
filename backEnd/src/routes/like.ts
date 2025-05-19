import { authenticateJWT } from '../middleware/Auth'; 
import express from 'express';
import { likePost,unlikePost } from '../controller/like'; // Assuming you have a controller for likes

const likeRouter = express.Router();

likeRouter.post('/likePost/:post_id', authenticateJWT, likePost);
likeRouter.delete('/unlikePost/:post_id', authenticateJWT, unlikePost);
export default likeRouter;