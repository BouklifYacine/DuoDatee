import { protectedProcedure } from "../../../trpc/index";
import { prisma } from "../../../../lib/prisma";
import { completeOnboardingSchema } from "./user.schema";

export const userOnboardingCompletePatch = protectedProcedure
  .input(completeOnboardingSchema)
  .mutation(async ({ ctx }) => {
    return prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        hasCompletedOnboarding: true,
      },
      select: {
        id: true,
        hasCompletedOnboarding: true,
      },
    });
  });
