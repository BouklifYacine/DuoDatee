import { protectedProcedure } from "../../../trpc/index";
import { prisma } from "../../../../lib/prisma";

export const coupleGet = protectedProcedure.query(async ({ ctx }) => {
  const coupleMember = await prisma.coupleMember.findFirst({
    where: {
      userId: ctx.user.id,
    },
    include: {
      couple: {
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatarPlaceholder: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!coupleMember || !coupleMember.couple) {
    return null;
  }

  return coupleMember.couple;
});
