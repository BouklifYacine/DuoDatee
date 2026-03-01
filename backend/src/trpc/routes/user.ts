import { z } from "zod";
import { router, protectedProcedure } from "../index";
import { prisma } from "../../../lib/prisma";

export const userRouter = router({
  // GET /api/trpc/user/getMe
  getMe: protectedProcedure.query(async ({ ctx }) => {
    return prisma.user.findUnique({
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
      },
    });
  }),

  // PATCH /api/trpc/user/updateProfil
  updateProfil: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(20).trim(),
        age: z.number().min(16).max(99).int().positive().optional(),
        gender: z.enum(["homme", "femme"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.user.update({
        where: { id: ctx.user.id },
        data: {
          name: input.name,
          age: input.age,
          gender: input.gender,
        },
        select: {
          id: true,
          name: true,
          age: true,
          gender: true,
          avatarPlaceholder: true,
        },
      });
    }),

  // PATCH /api/trpc/user/updatePreferences
  updatePreferences: protectedProcedure
    .input(
      z.object({
        preferredTypes: z.array(z.enum(["bouffe", "boire", "activite"])).optional(),
        preferredBudget: z.enum(["economique", "moyen", "premium"]).optional(),
        preferredDistance: z.number().min(1).max(100).optional(),
      })
    )
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
    }),

  // PATCH /api/trpc/user/completeOnboarding
  completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
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
  }),
});
