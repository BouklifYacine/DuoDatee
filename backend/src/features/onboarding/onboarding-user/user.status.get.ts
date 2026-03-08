import { protectedProcedure } from "../../../trpc/index";
import { prisma } from "../../../../lib/prisma";

export const userStatusGet = protectedProcedure.query(async ({ ctx }) => {
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
});
