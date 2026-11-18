
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type OutboxDocument = HydratedDocument<Outbox>;

export enum OutboxStatus {
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Outbox {
  @Prop({ required: true, unique: true, index: true })
  eventId!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({
    type: MongooseSchema.Types.Mixed,
    required: true,
  })
  payload!: Record<string, unknown>;

  @Prop({
    enum: OutboxStatus,
    default: OutboxStatus.PENDING,
    index: true,
  })
  status!: OutboxStatus;

  @Prop({ default: 0 })
  attempts!: number;

  @Prop()
  publishedAt?: Date;
}

export const OutboxSchema = SchemaFactory.createForClass(Outbox);
