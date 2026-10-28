import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { NotificationType } from './notification-event.js';

export class CreateNotificationDto {
  @IsEnum(NotificationType)
  type!: NotificationType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  recipientId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  body!: string;
}
