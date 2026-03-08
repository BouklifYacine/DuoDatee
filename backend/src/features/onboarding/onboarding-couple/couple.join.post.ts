import { protectedProcedure } from "../../../trpc/index";
import { prisma } from "../../../../lib/prisma";
import { joinCoupleSchema } from "./couple.schema";
import { TRPCError } from "@trpc/server";

export const coupleJoinPost = protectedProcedure
  .input(joinCoupleSchema)
  .mutation(async ({ ctx, input }) => {
    // Trouver le couple par le code d'invitation
    const couple = await prisma.couple.findUnique({
      where: {
        inviteCode: input.inviteCode,
      },
      include: {
        members: true,
      },
    });

    if (!couple) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Code d'invitation invalide",
      });
    }

    // Vérifier que l'utilisateur n'est pas déjà membre
    const existingMember = couple.members.find(
      (member) => member.userId === ctx.user.id
    );

    if (existingMember) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Vous êtes déjà membre de ce couple",
      });
    }

    // Vérifier que le couple n'est pas complet (max 2 membres)
    if (couple.members.length >= 2) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Ce couple est déjà complet",
      });
    }

    // Ajouter l'utilisateur comme invité
    const updatedCouple = await prisma.couple.update({
      where: {
        id: couple.id,
      },
      data: {
        status: "active",
        members: {
          create: {
            userId: ctx.user.id,
            role: "invited",
            joinedAt: new Date(),
          },
        },
      },
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
    });

    return updatedCouple;
  });
