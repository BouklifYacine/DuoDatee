import { prisma } from "../../../../lib/prisma";
import type { UpdateCoupleInput } from "./couple.types";

export const CoupleService = {
  async updateOnboarding(userId: string, data: UpdateCoupleInput) {
    return prisma.$transaction(async (tx) => {
      const existingMember = await tx.coupleMember.findFirst({
        where: { userId },
        include: { couple: true },
      });

      let couple;

      if (existingMember) {
        couple = await tx.couple.update({
          where: { id: existingMember.coupleId },
          data: {
            relationshipDuration: data.relationshipDuration,
            relationshipStatus: data.relationshipStatus,
            livingSituation: data.livingSituation,
          },
        });
      } else {
        couple = await tx.couple.create({
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
        });
      }

      // Marquer l'onboarding comme terminé
      await tx.user.update({
        where: { id: userId },
        data: { hasCompletedOnboarding: true },
      });

      return couple;
    });
  },
};
