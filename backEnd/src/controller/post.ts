import { Post } from "../../models/post"; 
import { Request, Response } from "express";

// -- create post
export const createPost = async (req: any, res: any) => {
    const { title, content } = req.body;
    const userId = req.body.userId; 

    try {
        const post = await Post.create({
            title,
            content,
            user_id: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({ success: true, post });
        return;
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error });
        return;
    }
}

// -- Get all posts

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error });
    return;
  }
};

// -- Get post by UserId
export const getPostById = async (req: Request, res: Response) => {
  const userId = req.body.userId; 
  try {
    const post = await Post.findOne({ where: { user_id: userId } });
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json(post);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error });
    return;
  }
};


// -- Update post
export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.postId; // Ambil post_id dari parameter URL
  const { title, content } = req.body;

  try {
    const post = await Post.findOne({ where: { post_id: postId } });
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.json(post);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error });
    return;
  }
}
// -- Delete post
export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId; 

  try {
    const post = await Post.findOne({ where: { post_id: postId } });
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    await post.destroy();

    res.json({ message: 'Post deleted successfully' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error });
    return;
  }
}

// -- get post content
export const getPostContent = async (req: Request, res: Response) => {
  const postId = req.params.postId; // Ambil post_id dari parameter URL
  try {
    const post = await Post.findOne({ where: { post_id: postId } });
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json(post.content);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post content', error: error });
    return;
  }
}

// -- get post title
export const getPostTitle = async (req: Request, res: Response) => {
  const postId = req.params.postId; // Ambil post_id dari parameter URL
  try {
    const post = await Post.findOne({ where: { post_id: postId } });
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json(post.title);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post title', error: error });
    return;
  }
}


