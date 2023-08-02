import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class BlockUserDto {
  @IsNumber()
  @Min(1)
  readonly userId: number;
  @IsString()
  @IsNotEmpty()
  readonly blockReason: string;
}
