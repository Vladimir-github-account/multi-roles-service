import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }
  async signUp(dto: CreateUserDto) {
    const oldUser = await this.userService.getUserByEmail(dto.email);
    if (oldUser) {
      throw new HttpException(
        'User Already Exist. Please Login',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const isPasswordsEquals = await bcrypt.compare(dto.password, user.password);
    if (user && user.isBlocked) {
      throw new UnauthorizedException({ message: 'User is blocked' });
    }
    if (user && isPasswordsEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Invalid Credentials' });
  }
}
