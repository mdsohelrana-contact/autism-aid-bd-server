import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import responseHandler from "../../utils/responseHandler";
import { NotificationService } from "./notification.service";

// Create notification
const createNotification = catchAsync(async (req, res) => {
  const notification = await NotificationService.createNotification(req.body);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notification created successfully",
    data: notification,
  });
});

// Get user notifications
const getUserNotifications = catchAsync(async (req, res) => {
  const userId = req!.user!.id;

  const notifications = await NotificationService.getUserNotifications(
    userId,
    false
  );

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "User notifications retrieved successfully",
    data: notifications,
  });
});

// Mark notification as read
const markNotificationAsRead = catchAsync(async (req, res) => {
  const notificationId = req.params.id;

  await NotificationService.markNotificationAsRead(notificationId);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notification marked as read successfully",
  });
});

// Mark all notifications as read
const markAllNotificationsAsRead = catchAsync(async (req, res) => {
  const userId = req!.user!.id;

  await NotificationService.markAllNotificationsAsRead(userId);

  responseHandler({
    res,
    req,
    statusCode: StatusCodes.OK,
    success: true,
    message: "All notifications marked as read successfully",
  });
});


export const NotificationController = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};
