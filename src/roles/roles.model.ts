import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Unique,
  Model,
  PrimaryKey,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  roleTitle: string;
  description: string;
}

// noinspection JSAnnotator
@Table({ tableName: 'roles', timestamps: true })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Id' })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ApiProperty({ example: 'USER', description: 'Role title' })
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  roleTitle: string;

  @ApiProperty({ example: 'Registered user', description: 'Role description' })
  @AllowNull(false)
  @Column(DataType.STRING)
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
