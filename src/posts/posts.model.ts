import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.model';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  imageSrc: string;
}

// noinspection JSAnnotator
@Table({ tableName: 'posts', timestamps: true })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Id' })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ example: 'Title', description: 'Title for post' })
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @ApiProperty({ example: 'Any content', description: 'Content for post' })
  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;

  @ApiProperty({ example: 'path-to-image', description: "Post's image" })
  @Column(DataType.STRING)
  imageSrc: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
