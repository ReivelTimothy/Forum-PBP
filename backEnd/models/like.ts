// models/like.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';
import { Post } from './post';

@Table
export class Like extends Model {
    @Column({
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare like_id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare user_id: string;

    @ForeignKey(() => Post)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare post_id: string;

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Post)
    declare post: Post;
}
