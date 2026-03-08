import { protectedProcedure } from "../../../trpc/index";
import { prisma } from "../../../../lib/prisma";
import { updatePreferencesSchema } from "./preferences.schema";

export const preferencesPatch = protectedProcedure
  .input(updatePreferencesSchema)
  .mutation(async ({ ctx, input }) => {
    return prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        preferredTypes: input.preferredTypes,
        preferredBudget: input.preferredBudget,
        preferredDistance: input.preferredDistance,
      },
      select: {
        id: true,
        preferredTypes: true,
        preferredBudget: true,
        preferredDistance: true,
      },
    });
  });
