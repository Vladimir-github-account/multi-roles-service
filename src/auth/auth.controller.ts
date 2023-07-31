import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  signIn(@Body() dto: CreateUserDto) {
    return this.authService.signIn(dto);
  }
  @Post('/register')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }
}
