import { User } from "@prisma/client";
import prisma from "../prisma";

interface FindUserParams {
  email?: string;
  phone?: string;
}

export const findUserByEmailOrPhone = async (
  params: FindUserParams
): Promise<User | null> => {
  const { email, phone } = params;

  if (!email && !phone) {
    throw new Error("Either email or phone must be provided");
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [email ? { email } : undefined, phone ? { phone } : undefined].filter(
        Boolean
      ) as any,
    },
  });

  // if (!user) {
  //   throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  // }

  return user;
};
