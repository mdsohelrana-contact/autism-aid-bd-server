import prisma from "../../utils/prisma";
import { CreateNotificationDto } from "./notification.type";

// Create notification
const createNotification = async (data: CreateNotificationDto) => {
  return prisma.notification.create({ data });
};

// Get user notifications
const getUserNotifications = async (userId: string, unreadOnly: false) => {
  const where: any = { OR: [{ userId }, { userId: null }] };
  if (unreadOnly) where.read = false;

  return prisma.notification.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};


// Mark as read
const markNotificationAsRead = async (notificationId: string) => {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });
};

// Mark all as read
const markAllNotificationsAsRead = async (userId: string) => {
  return prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
};


export const NotificationService = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};