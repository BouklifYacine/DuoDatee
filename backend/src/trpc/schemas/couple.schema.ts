import { z } from "zod";

export const createCoupleSchema = z.object({
  relationshipDuration: z.enum(["moins_de_6m", "six_mois_un_an", "un_trois_ans", "trois_cinq_ans", "cinq_dix_ans", "dix_ans_plus"]),
  relationshipStatus: z.enum(["en_couple", "fiances", "pacses", "maries"]),
  livingSituation: z.enum(["ensemble", "separes_proche", "separes_loin"]),
}).strict();

export type CreateCoupleInput = z.infer<typeof createCoupleSchema>;

export const joinCoupleSchema = z.object({
  inviteCode: z.string().length(6),
}).strict();

export type JoinCoupleInput = z.infer<typeof joinCoupleSchema>;
