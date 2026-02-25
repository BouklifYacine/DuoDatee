-- AlterEnum: Gender
ALTER TYPE "Gender" RENAME TO "Gender_old";
CREATE TYPE "Gender" AS ENUM ('homme', 'femme');
ALTER TABLE "user" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "gender" TYPE "Gender" USING (
  CASE "gender"::text
    WHEN 'male' THEN 'homme'::"Gender"
    WHEN 'female' THEN 'femme'::"Gender"
    ELSE NULL
  END
);
DROP TYPE "Gender_old";

-- AlterEnum: Budget
ALTER TYPE "Budget" RENAME TO "Budget_old";
CREATE TYPE "Budget" AS ENUM ('economique', 'moyen', 'premium');
ALTER TABLE "user" ALTER COLUMN "preferredBudget" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "preferredBudget" TYPE "Budget" USING (
  CASE "preferredBudget"::text
    WHEN 'cheap' THEN 'economique'::"Budget"
    WHEN 'medium' THEN 'moyen'::"Budget"
    WHEN 'premium' THEN 'premium'::"Budget"
    ELSE 'moyen'::"Budget"
  END
);
ALTER TABLE "idea" ALTER COLUMN "budget" TYPE "Budget" USING (
  CASE "budget"::text
    WHEN 'cheap' THEN 'economique'::"Budget"
    WHEN 'medium' THEN 'moyen'::"Budget"
    WHEN 'premium' THEN 'premium'::"Budget"
    ELSE 'moyen'::"Budget"
  END
);
DROP TYPE "Budget_old";
