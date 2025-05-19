import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user";
import { Post } from "./models/post";
import { Comment } from "./models/comment";
import { Like } from "./models/like";
import { v4 as uuidv4 } from "uuid";

const config = require("./config/config.json");

const sequelize = new Sequelize({
  ...config.development,
  models: [User, Post, Comment, Like],
});

async function createDummyData() {
  try {
    await sequelize.sync();

    // Users
    const user1 = await User.create({
      user_id: uuidv4(),
      username: "alice",
      email: "alice@example.com",
      password: "hashedpassword1",
    });

    const user2 = await User.create({
      user_id: uuidv4(),
      username: "bob",
      email: "bob@example.com",
      password: "hashedpassword2",
    });

    // Posts
    const post1 = await Post.create({
      post_id: uuidv4(),
      title: "My First Post",
      content: "Hello, this is my first post!",
      user_id: user1.user_id,
    });

    const post2 = await Post.create({
      post_id: uuidv4(),
      title: "Another Day, Another Post",
      content: "Nice to meet you all!",
      user_id: user2.user_id,
    });

    // Comments
    const comment1 = await Comment.create({
      comment_id: uuidv4(),
      content: "Great post!",
      user_id: user2.user_id,
      post_id: post1.post_id,
      parent_comment_id: null,
    });

    const comment2 = await Comment.create({
      comment_id: uuidv4(),
      content: "Thank you!",
      user_id: user1.user_id,
      post_id: post1.post_id,
      parent_comment_id: null,
    });

    const comment3 = await Comment.create({
      comment_id: uuidv4(),
      content: "You are welcome!",
      user_id: user2.user_id,
      post_id: post1.post_id,
      parent_comment_id: null,
    });

    // Likes
    await Like.create({
      like_id: uuidv4(),
      user_id: user1.user_id,
      post_id: post2.post_id,
    });

    await Like.create({
      like_id: uuidv4(),
      user_id: user2.user_id,
      post_id: post1.post_id,
    });

    console.log("Dummy data created");
  } catch (error) {
    console.error("Unable to create dummy data:", error);
  } finally {
    await sequelize.close();
  }
}

createDummyData();

