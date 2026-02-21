-- CreateEnum
CREATE TYPE "RelationshipDuration" AS ENUM ('less_than_6m', 'six_months_1y', 'one_years_3y', 'three_years_5y', 'five_years_10y', 'ten_years_plus');

-- CreateEnum
CREATE TYPE "RelationshipStatus" AS ENUM ('couple', 'fiances', 'pacses', 'maries');

-- CreateEnum
CREATE TYPE "LivingSituation" AS ENUM ('together', 'separate_close', 'separate_far');

-- AlterTable
ALTER TABLE "couple" ADD COLUMN "inviteCode" TEXT,
ADD COLUMN "relationshipDuration" "RelationshipDuration",
ADD COLUMN "relationshipStatus" "RelationshipStatus",
ADD COLUMN "livingSituation" "LivingSituation";

-- CreateIndex
CREATE UNIQUE INDEX "couple_inviteCode_key" ON "couple"("inviteCode");
