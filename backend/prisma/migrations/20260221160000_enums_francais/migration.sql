-- AlterEnum: RelationshipDuration
ALTER TYPE "RelationshipDuration" RENAME TO "RelationshipDuration_old";
CREATE TYPE "RelationshipDuration" AS ENUM ('moins_de_6m', 'six_mois_un_an', 'un_trois_ans', 'trois_cinq_ans', 'cinq_dix_ans', 'dix_ans_plus');
ALTER TABLE "couple" ALTER COLUMN "relationshipDuration" DROP DEFAULT;
ALTER TABLE "couple" ALTER COLUMN "relationshipDuration" TYPE "RelationshipDuration" USING (
  CASE "relationshipDuration"::text
    WHEN 'less_than_6m' THEN 'moins_de_6m'::"RelationshipDuration"
    WHEN 'six_months_1y' THEN 'six_mois_un_an'::"RelationshipDuration"
    WHEN 'one_years_3y' THEN 'un_trois_ans'::"RelationshipDuration"
    WHEN 'three_years_5y' THEN 'trois_cinq_ans'::"RelationshipDuration"
    WHEN 'five_years_10y' THEN 'cinq_dix_ans'::"RelationshipDuration"
    WHEN 'ten_years_plus' THEN 'dix_ans_plus'::"RelationshipDuration"
    ELSE NULL
  END
);
DROP TYPE "RelationshipDuration_old";

-- AlterEnum: RelationshipStatus
ALTER TYPE "RelationshipStatus" RENAME TO "RelationshipStatus_old";
CREATE TYPE "RelationshipStatus" AS ENUM ('en_couple', 'fiances', 'pacses', 'maries');
ALTER TABLE "couple" ALTER COLUMN "relationshipStatus" DROP DEFAULT;
ALTER TABLE "couple" ALTER COLUMN "relationshipStatus" TYPE "RelationshipStatus" USING (
  CASE "relationshipStatus"::text
    WHEN 'couple' THEN 'en_couple'::"RelationshipStatus"
    WHEN 'fiances' THEN 'fiances'::"RelationshipStatus"
    WHEN 'pacses' THEN 'pacses'::"RelationshipStatus"
    WHEN 'maries' THEN 'maries'::"RelationshipStatus"
    ELSE NULL
  END
);
DROP TYPE "RelationshipStatus_old";

-- AlterEnum: LivingSituation
ALTER TYPE "LivingSituation" RENAME TO "LivingSituation_old";
CREATE TYPE "LivingSituation" AS ENUM ('ensemble', 'separes_proche', 'separes_loin');
ALTER TABLE "couple" ALTER COLUMN "livingSituation" DROP DEFAULT;
ALTER TABLE "couple" ALTER COLUMN "livingSituation" TYPE "LivingSituation" USING (
  CASE "livingSituation"::text
    WHEN 'together' THEN 'ensemble'::"LivingSituation"
    WHEN 'separate_close' THEN 'separes_proche'::"LivingSituation"
    WHEN 'separate_far' THEN 'separes_loin'::"LivingSituation"
    ELSE NULL
  END
);
DROP TYPE "LivingSituation_old";
