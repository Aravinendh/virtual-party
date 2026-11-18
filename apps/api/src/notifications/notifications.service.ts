
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'node:crypto';
import type { Connection, Model } from 'mongoose';

import { InjectConnection } from '@nestjs/mongoose';

import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema.js';

import {
  Outbox,
  OutboxDocument,
  OutboxStatus,
} from './schemas/outbox.schema.js';

import { NotificationType } from './notification-event.js';
import { NotificationEvent } from './notification-event.js';
import { CreateNotificationDto } from './create-notification.dto.js';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,

    @InjectModel(Outbox.name)
    private readonly outboxModel: Model<OutboxDocument>,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async create(
    dto: CreateNotificationDto,
  ): Promise<NotificationEvent> {
    const event: NotificationEvent = {
      eventId: randomUUID(),
      type: dto.type as NotificationType,
      recipientId: dto.recipientId,
      title: dto.title,
      body: dto.body,
      createdAt: new Date().toISOString(),
      version: 1,
    };

    const session = await this.connection.startSession();

    try {
      await session.withTransaction(async () => {
        await this.notificationModel.create(
          [
            {
              eventId: event.eventId,
              recipientId: event.recipientId,
              type: event.type,
              title: event.title,
              body: event.body,
            },
          ],
          { session },
        );

        await this.outboxModel.create(
          [
            {
              eventId: event.eventId,
              type: event.type,
              payload: {...event},
              status: OutboxStatus.PENDING,
              attempts: 0,
            },
          ],
          { session },
        );
      });

      return event;
    } finally {
      await session.endSession();
    }
  }
}
