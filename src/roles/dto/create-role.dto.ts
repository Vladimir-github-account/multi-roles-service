import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly roleTitle: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
