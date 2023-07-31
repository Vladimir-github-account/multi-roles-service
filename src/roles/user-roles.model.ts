import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Role } from './roles.model';

// noinspection JSAnnotator
@Table({ tableName: 'user_roles', timestamps: false })
export class UserRoles extends Model<UserRoles> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  roleId: number;
}
