
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationsController } from './notifications.controller.js';
import { NotificationsService } from './notifications.service.js';

import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema.js';

import {
  Outbox,
  OutboxSchema,
} from './schemas/outbox.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
      {
        name: Outbox.name,
        schema: OutboxSchema,
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
