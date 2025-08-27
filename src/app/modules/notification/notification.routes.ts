import { Router } from "express";
import auth from "../../middlewares/auth";
import { NotificationController } from "./notification.controller";

const router = Router();

router.use(auth());

router.get("/", NotificationController.getUserNotifications);

router.post("/read/:id", NotificationController.markNotificationAsRead);

router.post("/read-all", NotificationController.markAllNotificationsAsRead);

router.post("/send", NotificationController.createNotification);

export const notificationRoutes = router;
