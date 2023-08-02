import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly roleTitle: string;
  @IsNumber()
  @Min(1)
  readonly userId: number;
}
