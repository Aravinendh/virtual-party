export enum NotificationType {
  CREATOR_EVENT_SCHEDULED = 'CREATOR_EVENT_SCHEDULED',
  CREATOR_EVENT_STARTED = 'CREATOR_EVENT_STARTED',
  ROOM_INVITATION = 'ROOM_INVITATION',
}

export interface NotificationEvent {
  eventId: string;
  type: NotificationType;
  recipientId: string;
  title: string;
  body: string;
  createdAt: string;
  version: 1;
}
