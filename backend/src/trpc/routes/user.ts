import { z } from "zod";
import { router, protectedProcedure } from "../index";
import { prisma } from "../../../lib/prisma";
import { updateProfilSchema, completeOnboardingSchema } from "../schemas/user.schema";
import { updatePreferencesSchema } from "../schemas/preferences.schema";

export const userRouter = router({
  // GET /api/trpc/user/getMe
  getMe: protectedProcedure.query(async ({ ctx }) => {
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
  }),

  // GET /api/trpc/user/getOnboardingStatus
  getOnboardingStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.user.id },
      select: {
        name: true,
        age: true,
        gender: true,
        preferredTypes: true,
        preferredBudget: true,
        preferredDistance: true,
        hasCompletedOnboarding: true,
        coupleMembers: {
          include: {
            couple: true,
          },
        },
      },
    });

    if (!user) {
      return {
        hasName: false,
        hasAge: false,
        hasGender: false,
        hasPreferences: false,
        hasCouple: false,
        hasCompletedOnboarding: false,
      };
    }

    const hasCouple = user.coupleMembers.some(
      (member) => member.couple !== null && member.couple.status === "active"
    );

    const hasPreferences =
      user.preferredTypes !== undefined &&
      user.preferredTypes.length > 0 &&
      user.preferredBudget !== undefined &&
      user.preferredDistance !== undefined;

    return {
      hasName: user.name !== undefined && user.name !== null && user.name.length >= 3,
      hasAge: user.age !== undefined && user.age !== null,
      hasGender: user.gender !== undefined && user.gender !== null,
      hasPreferences,
      hasCouple,
      hasCompletedOnboarding: user.hasCompletedOnboarding,
    };
  }),

  // PATCH /api/trpc/user/updateProfil
  updateProfil: protectedProcedure
    .input(updateProfilSchema)
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
    }),

  // PATCH /api/trpc/user/completeOnboarding
  completeOnboarding: protectedProcedure
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
    }),
});
