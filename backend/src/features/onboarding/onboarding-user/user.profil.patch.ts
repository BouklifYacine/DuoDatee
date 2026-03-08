import { protectedProcedure } from "../../../trpc/index";
import { prisma } from "../../../../lib/prisma";
import { updateProfilSchema } from "./user.schema";

export const userProfilPatch = protectedProcedure
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
  });
