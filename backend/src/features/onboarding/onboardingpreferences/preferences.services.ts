import { prisma } from "../../../../lib/prisma";
import type { UpdatePreferencesInput } from "./preferences.types";

export const PreferencesService = {
  async update(userId: string, data: UpdatePreferencesInput) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        preferredTypes: data.preferredTypes,
        preferredBudget: data.preferredBudget as "cheap" | "medium" | "premium",
        preferredDistance: data.preferredDistance,
      },
      select: {
        id: true,
        preferredTypes: true,
        preferredBudget: true,
        preferredDistance: true,
      },
    });
  },
};
