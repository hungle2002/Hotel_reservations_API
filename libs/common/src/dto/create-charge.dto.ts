import { CardDto } from './card.dto';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChargeMessage } from '../types';

export class CreateChargeDto implements Omit<CreateChargeMessage, 'email'> {
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
}
