import * as z from "zod";

export const onboardingStatusSchema = z.object({
  hasCompletedOnboarding: z.boolean(),
});

export type OnboardingStatus = z.infer<typeof onboardingStatusSchema>;
