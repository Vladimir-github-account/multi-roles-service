import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Default,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

// noinspection JSAnnotator
@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Id' })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @AllowNull(false)
  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @ApiProperty({ example: 'Pa$$w0rd', description: "User's password" })
  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @ApiProperty({ example: 'true', description: 'Is user blocked' })
  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isBlocked: boolean;

  @ApiProperty({ example: 'Racism', description: 'Block reason' })
  @Column(DataType.STRING)
  blockReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
