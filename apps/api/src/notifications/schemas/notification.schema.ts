
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument =
  HydratedDocument<Notification>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Notification {
  @Prop({ required: true, unique: true, index: true })
  eventId!: string;

  @Prop({ required: true, index: true })
  recipientId!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true, maxlength: 120 })
  title!: string;

  @Prop({ required: true, maxlength: 2000 })
  body!: string;

  @Prop({ default: false, index: true })
  isRead!: boolean;
}

export const NotificationSchema =
  SchemaFactory.createForClass(Notification);
