import { prisma } from "../../../../lib/prisma";
import type { UpdateProfilInput } from "./user.types";

export const UserService = {
  async updateProfil(userId: string, data: UpdateProfilInput) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        age: data.age,
        gender: data.gender ?? undefined,
      },
      select: {
        id: true,
        name: true,
        age: true,
        gender: true,
        avatarPlaceholder: true,
      },
    });
  },
};
