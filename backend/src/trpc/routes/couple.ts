import { router, protectedProcedure } from "../index";
import { prisma } from "../../../lib/prisma";
import { createCoupleSchema, joinCoupleSchema } from "../schemas/couple.schema";
import { TRPCError } from "@trpc/server";
import { randomBytes } from "crypto";
import { z } from "zod";

// Fonction utilitaire pour générer un code d'invitation de 6 caractères
// Utilise crypto.randomBytes pour une sécurité appropriée
function generateInviteCode(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const code = randomBytes(6)
    .toString("uppercase")
    .split("")
    .map((byte) => characters[byte % characters.length])
    .join("");
  return code;
}

export const coupleRouter = router({
  // GET /api/trpc/couple/getMyCouple
  getMyCouple: protectedProcedure.query(async ({ ctx }) => {
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
  }),

  // POST /api/trpc/couple/create
  create: protectedProcedure
    .input(createCoupleSchema)
    .mutation(async ({ ctx, input }) => {
      const inviteCode = generateInviteCode();

      const couple = await prisma.couple.create({
        data: {
          inviteCode,
          status: "active",
          relationshipDuration: input.relationshipDuration,
          relationshipStatus: input.relationshipStatus,
          livingSituation: input.livingSituation,
          members: {
            create: {
              userId: ctx.user.id,
              role: "inviter",
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

      return couple;
    }),

  // POST /api/trpc/couple/join
  join: protectedProcedure
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
    }),
});
