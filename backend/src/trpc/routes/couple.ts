import { router } from "../index";
import {
  coupleGet,
  coupleCreatePost,
  coupleJoinPost,
} from "../../features/onboarding/onboarding-couple";

export const coupleRouter = router({
  getMyCouple: coupleGet,
  create: coupleCreatePost,
  join: coupleJoinPost,
});
