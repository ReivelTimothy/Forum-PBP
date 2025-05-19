import { Comment } from "../../models/comment";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

interface CommentNode {
    comment_id: string;
    content: string;
    user_id: string;
    post_id: string;
    parent_comment_id: string | null;
    replies: CommentNode[];
}

// -- get all comments from a post 
export const getCommentsByPostId = async (req: Request, res: Response) => {
    const { post_id } = req.params;

    try {
        console.log("post_id", post_id);
        // Ambil semua komentar untuk post_id tertentu
        const comments = await Comment.findAll({
            where: { post_id },
            order: [['createdAt', 'ASC']],
            raw: true,
        });

        // Buat dictionary agar lebih cepat mencari parent-child
        const commentMap: { [key: string]: CommentNode } = {};
        const roots: CommentNode[] = [];

        // Ubah data mentah jadi struktur node
        comments.forEach(comment => {
            commentMap[comment.comment_id] = {
                ...comment,
                replies: [],
            };
        });

        // Bangun struktur tree (bertingkat)
        comments.forEach(comment => {
            const node = commentMap[comment.comment_id];
            if (comment.parent_comment_id) {
                commentMap[comment.parent_comment_id]?.replies.push(node);
            } else {
                roots.push(node);
            }
        });

        res.status(200).json({
            message: "Komentar berhasil diambil",
            comments: roots
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil komentar",
            error,
        });
        return;
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        const { content, post_id, parent_comment_id } = req.body;
        const user_id = req.body.userId; 
        console.log("user_id", user_id);
        console.log("post_id", post_id);
        console.log("parent_comment_id", parent_comment_id);
        console.log("content", content);
        if (!content || !user_id || !post_id) {
            
            res.status(400).json({ message: "Field wajib: content, user_id, post_id" });
            return;
        }

        const newComment = await Comment.create({
            comment_id: uuidv4(),
            content,
            user_id,
            post_id,
            parent_comment_id: parent_comment_id || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({
            message: "Komentar berhasil ditambahkan",
            comment: newComment,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Gagal menambahkan komentar",
            error,
        });
        return;
    }
};

// -- get comment by id
export const getCommentById = async (req: Request, res: Response) => {
    const { comment_id } = req.params;

    try {
        const comment = await Comment.findOne({
            where: { comment_id },
        });

        if (!comment) {
            res.status(404).json({ message: "Komentar tidak ditemukan" });
            return;
        }

        res.status(200).json({
            message: "Komentar berhasil diambil",
            comment,
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil komentar",
            error,
        });
        return;
    }
};

// -- update comment
export const updateComment = async (req: Request, res: Response) => {
    const { comment_id } = req.params;
    const { content } = req.body;

    try {
        const comment = await Comment.findOne({
            where: { comment_id },
        });

        if (!comment) {
            res.status(404).json({ message: "Komentar tidak ditemukan" });
            return;
        }

        await Comment.update(
            { content },
            { where: { comment_id } }
        );

        res.status(200).json({
            message: "Komentar berhasil diperbarui",
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Gagal memperbarui komentar",
            error,
        });
        return;
    }
};
// -- delete comment
export const deleteComment = async (req: Request, res: Response) => {
    const { comment_id } = req.params;

    try {
        const comment = await Comment.findOne({
            where: { comment_id },
        });

        if (!comment) {
            res.status(404).json({ message: "Komentar tidak ditemukan" });
            return;
        }

        await Comment.destroy({
            where: { comment_id },
        });

        res.status(200).json({
            message: "Komentar berhasil dihapus",
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus komentar",
            error,
        });
        return;
    }
};