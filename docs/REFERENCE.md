# REFERENCE

## 0. Installation Verification

```
git --version
node --version
npm --version
docker --version
docker compose version
elixir --version
mix --version
```

## 1. Starting the services
```
cd infra
docker compose up -d
docker compose ps
```

## 2. Initialize MongoDB replica

```
docker exec vp-mongodb mongosh --quiet --eval "try { rs.status().ok } catch (e) { rs.initiate({_id:'rs0',members:[{_id:0,host:'localhost:27017'}]}) }"
```
Then verifiy using:
```
docker exec vp-mongodb mongosh --quiet --eval "rs.status().myState"
```

## 3. Notification Event Contract

Step 1: Install validation libraries
In Windows Command Prompt, from D:\virtual-party\apps\api, run:

```
npm install class-validator class-transformer
```

## 4. Notificatino Contract

```
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
```
