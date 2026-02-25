import { prisma } from "../../../../lib/prisma";
import type { UpdateCoupleInput } from "./couple.types";

export const CoupleService = {
  async updateOnboarding(userId: string, data: UpdateCoupleInput) {
    const existingMember = await prisma.coupleMember.findFirst({
      where: { userId },
      include: { couple: true },
    });

    if (existingMember) {
      return prisma.couple.update({
        where: { id: existingMember.coupleId },
        data: {
          relationshipDuration: data.relationshipDuration,
          relationshipStatus: data.relationshipStatus,
          livingSituation: data.livingSituation,
        },
        select: {
          id: true,
          relationshipDuration: true,
          relationshipStatus: true,
          livingSituation: true,
          status: true,
        },
      });
    }

    return prisma.couple.create({
      data: {
        status: "pending",
        relationshipDuration: data.relationshipDuration,
        relationshipStatus: data.relationshipStatus,
        livingSituation: data.livingSituation,
        members: {
          create: {
            userId,
            role: "inviter",
          },
        },
      },
      select: {
        id: true,
        relationshipDuration: true,
        relationshipStatus: true,
        livingSituation: true,
        status: true,
      },
    });
  },
};
