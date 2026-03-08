import { protectedProcedure } from "../../../trpc/index";
import { prisma } from "../../../../lib/prisma";

export const userGet = protectedProcedure.query(async ({ ctx }) => {
  const user = await prisma.user.findUnique({
    where: { id: ctx.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      gender: true,
      avatarPlaceholder: true,
      preferredTypes: true,
      preferredBudget: true,
      preferredDistance: true,
      hasCompletedOnboarding: true,
      createdAt: true,
      coupleMembers: {
        include: {
          couple: true,
        },
      },
    },
  });

  // Transformer pour inclure les infos du couple
  if (user) {
    const coupleMember = user.coupleMembers?.[0];
    return {
      ...user,
      couple: coupleMember?.couple || null,
      coupleMembers: undefined,
    };
  }

  return user;
});
