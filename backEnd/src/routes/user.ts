import express from 'express';
import {login,register,getAllUser} from '../controller/user';
import { authenticateJWT } from '../middleware/Auth'; 

const userRouter = express.Router();
userRouter.post('/login', login) // aman
userRouter.post('/register', register) // aman
userRouter.get('/getAllUser', authenticateJWT, getAllUser) // aman 
userRouter.get('/getUserById', authenticateJWT, getAllUser) // aman
export default userRouter;

