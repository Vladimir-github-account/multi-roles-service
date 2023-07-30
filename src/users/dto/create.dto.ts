import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  readonly email: string;
  @ApiProperty({ example: 'Pa$$w0rd', description: "User's password" })
  readonly password: string;
}
