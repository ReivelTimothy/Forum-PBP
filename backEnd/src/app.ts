import express from 'express';
import userRoutes from './routes/user';
import postRouter from './routes/post';
import likeRouter from './routes/like';
import commentRouter from './routes/comments';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user';
import { Post } from '../models/post';  
import { Like } from '../models/like';  
import { Comment } from '../models/comment';  

const config = require('../config/config.json');
const app = express();
const sequelize = new Sequelize({ // sql -> oop
  ...config.development,
  models: [User, Post, Like, Comment]
});

sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch(err => {
    console.error('Database connection failed. Please check the credentials and database server:', err);
    process.exit(1);
  });
app.use(express.json());


// -- router
app.use('/user', userRoutes);
app.use('/post', postRouter);
app.use('/like', likeRouter);
app.use('/comment', commentRouter);



app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
app.use(express.json());