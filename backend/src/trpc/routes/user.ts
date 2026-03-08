import { router } from "../index";
import { userGet } from "../../features/onboarding/onboarding-user";
import { userProfilPatch } from "../../features/onboarding/onboarding-user";
import { statusGet } from "../../features/onboarding/onboarding-status";
import { preferencesPatch } from "../../features/onboarding/onboarding-preferences";
import { onboardingCompletePatch } from "../../features/onboarding/onboarding-status";

export const userRouter = router({
  getMe: userGet,
  getOnboardingStatus: statusGet,
  updateProfil: userProfilPatch,
  updatePreferences: preferencesPatch,
  completeOnboarding: onboardingCompletePatch,
});
