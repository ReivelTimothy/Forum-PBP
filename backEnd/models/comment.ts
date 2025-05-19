// models/comment.model.ts
import {Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './user';
import { Post } from './post';

@Table
export class Comment extends Model {
    @Column({
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare comment_id: string;

    @Column({ 
        type: DataType.TEXT, 
        allowNull: false 
    })
    declare content: string;

    @ForeignKey(() => User)
    @Column({ 
        type: DataType.UUID, 
        allowNull: false 
    })
    declare user_id: string;

    @BelongsTo(() => User)
    declare user: User;

    @ForeignKey(() => Post)
    @Column({ 
        type: DataType.UUID, 
        allowNull: false 
    })
    declare post_id: string;

    @BelongsTo(() => Post)
    declare post: Post;

    @ForeignKey(() => Comment)
    @Column({ 
        type: DataType.UUID, 
        allowNull: true 
    })
    declare parent_comment_id: string | null;

    @BelongsTo(() => Comment, { 
        foreignKey: 'parent_comment_id', 
        as: 'parent' 
    })
    declare parent?: Comment;

    @HasMany(() => Comment, { 
        foreignKey: 'parent_comment_id', 
        as: 'replies' 
    })
    declare replies?: Comment[];
}
