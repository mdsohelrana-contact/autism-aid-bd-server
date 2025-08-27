import { NotificationType } from "@prisma/client";

export interface CreateNotificationDto {
  userId?: string;
    type: NotificationType;
    title: string;
    message: string;
    link?: string;
    meta?: object;
}