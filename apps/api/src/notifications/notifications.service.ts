
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  NotificationEvent,
  NotificationType,
} from './notification-event.js';
import { CreateNotificationDto } from './create-notification.dto.js';

@Injectable()
export class NotificationsService {
  create(dto: CreateNotificationDto): NotificationEvent {
    return {
      eventId: randomUUID(),
      type: dto.type as NotificationType,
      recipientId: dto.recipientId,
      title: dto.title,
      body: dto.body,
      createdAt: new Date().toISOString(),
      version: 1,
    };
  }
}
