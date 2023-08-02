import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BlockUserDto } from './dto/block-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByRoleTitle('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
      rejectOnEmpty: false,
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByRoleTitle(dto.roleTitle);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
  }

  async blockUser(dto: BlockUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.isBlocked) {
      throw new HttpException('User already blocked', HttpStatus.BAD_REQUEST);
    }
    user.isBlocked = true;
    user.blockReason = dto.blockReason;
    await user.save();
    return user;
  }
}
