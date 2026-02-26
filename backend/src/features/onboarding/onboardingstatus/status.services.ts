import { prisma } from "../../../../lib/prisma";
import type { OnboardingStatus } from "./status.types";

export const StatusService = {
  async getOnboardingStatus(userId: string): Promise<OnboardingStatus> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        hasCompletedOnboarding: true,
      },
    });

    if (!user) {
      return {
        hasCompletedOnboarding: false,
      };
    }

    return {
      hasCompletedOnboarding: user.hasCompletedOnboarding,
    };
  },
};
