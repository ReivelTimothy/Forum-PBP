// models/post.model.ts
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './user';
import { Like } from './like';
import { Comment } from './comment';

@Table
export class Post extends Model {
    @Column({
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare post_id: string;

    @Column({ 
        type: DataType.STRING, 
        allowNull: false 
    })
    declare title: string;

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

    @HasMany(() => Like)
    declare likes: Like[];

    @HasMany(() => Comment)
    declare comments: Comment[];
}
