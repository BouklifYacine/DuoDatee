import { protectedProcedure } from "../../../trpc/index";
import { prisma } from "../../../../lib/prisma";
import { createCoupleSchema } from "./couple.schema";
import { generateInviteCode } from "../../../../lib/generateInviteCode";

export const coupleCreatePost = protectedProcedure
  .input(createCoupleSchema)
  .mutation(async ({ ctx, input }) => {
    const inviteCode = generateInviteCode();

    const couple = await prisma.couple.create({
      data: {
        inviteCode,
        status: "active",
        relationshipDuration: input.relationshipDuration,
        relationshipStatus: input.relationshipStatus,
        livingSituation: input.livingSituation,
        members: {
          create: {
            userId: ctx.user.id,
            role: "inviter",
            joinedAt: new Date(),
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarPlaceholder: true,
              },
            },
          },
        },
      },
    });

    return couple;
  });
