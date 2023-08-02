import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsString()
  @IsEmail()
  readonly email: string;
  @Length(8)
  @ApiProperty({ example: 'Pa$$w0rd', description: "User's password" })
  readonly password: string;
}
