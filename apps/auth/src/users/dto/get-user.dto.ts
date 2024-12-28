import { IsNotEmpty, IsString } from 'class-validator';

export class GetUser {
  @IsString()
  @IsNotEmpty()
  id: number;
}
