
import cron from "node-cron";
import prisma from "../prisma";
import { CouponStatus } from "@prisma/client";

// Run every hour
cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();

    // 1️⃣ Fetch all active coupons that are expired
    const expiredCoupons = await prisma.coupon.findMany({
      where: {
        isActive: true,
        validUntil: { lt: now },
      },
    });

    if (expiredCoupons.length > 0) {
      // 2️⃣ Update their status
      await prisma.coupon.updateMany({
        where: {
          id: { in: expiredCoupons.map((c) => c.id) },
        },
        data: {
          status: CouponStatus.EXPIRED,
          isActive: false,
        },
      });

      console.log(`✅ Expired ${expiredCoupons.length} coupons`);
    } else {
      console.log("⏳ No coupons to expire today");
    }
  } catch (error) {
    console.error("❌ Error in expiring coupons:", error);
  }
});
