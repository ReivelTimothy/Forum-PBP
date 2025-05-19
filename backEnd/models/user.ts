// models/user.model.ts
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Post } from './post';
import { Like } from './like';
import { Comment } from './comment';

@Table({ timestamps: false })
export class User extends Model {
    @Column({
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare user_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @HasMany(() => Post)
    declare posts: Post[];

    @HasMany(() => Like)
    declare likes: Like[];

    @HasMany(() => Comment)
    declare comments: Comment[];
}
