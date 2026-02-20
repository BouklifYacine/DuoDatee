-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "Budget" AS ENUM ('cheap', 'medium', 'premium');

-- CreateEnum
CREATE TYPE "IdeaType" AS ENUM ('bouffe', 'boire', 'activite');

-- CreateEnum
CREATE TYPE "CoupleStatus" AS ENUM ('pending', 'active');

-- CreateEnum
CREATE TYPE "CoupleRole" AS ENUM ('inviter', 'invited');

-- CreateEnum
CREATE TYPE "VoteValue" AS ENUM ('yes', 'no');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "age" INTEGER,
    "gender" "Gender",
    "avatarPlaceholder" TEXT,
    "preferredTypes" "IdeaType"[] DEFAULT ARRAY['bouffe', 'boire', 'activite']::"IdeaType"[],
    "preferredBudget" "Budget" DEFAULT 'medium',
    "preferredDistance" INTEGER DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "IdeaType" NOT NULL,
    "budget" "Budget" NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT,
    "photoUrl" TEXT,
    "vibes" TEXT[],
    "district" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "idea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "couple" (
    "id" TEXT NOT NULL,
    "inviteToken" TEXT,
    "status" "CoupleStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "couple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "couple_member" (
    "id" TEXT NOT NULL,
    "coupleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "CoupleRole" NOT NULL DEFAULT 'invited',
    "joinedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "couple_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote_session" (
    "id" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vote_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote" (
    "id" TEXT NOT NULL,
    "voteSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" "VoteValue" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "idea_type_idx" ON "idea"("type");

-- CreateIndex
CREATE INDEX "idea_budget_idx" ON "idea"("budget");

-- CreateIndex
CREATE INDEX "idea_district_idx" ON "idea"("district");

-- CreateIndex
CREATE INDEX "favorite_userId_idx" ON "favorite"("userId");

-- CreateIndex
CREATE INDEX "favorite_ideaId_idx" ON "favorite"("ideaId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_userId_ideaId_key" ON "favorite"("userId", "ideaId");

-- CreateIndex
CREATE UNIQUE INDEX "couple_inviteToken_key" ON "couple"("inviteToken");

-- CreateIndex
CREATE INDEX "couple_member_coupleId_idx" ON "couple_member"("coupleId");

-- CreateIndex
CREATE INDEX "couple_member_userId_idx" ON "couple_member"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "couple_member_coupleId_userId_key" ON "couple_member"("coupleId", "userId");

-- CreateIndex
CREATE INDEX "vote_session_ideaId_idx" ON "vote_session"("ideaId");

-- CreateIndex
CREATE INDEX "vote_voteSessionId_idx" ON "vote"("voteSessionId");

-- CreateIndex
CREATE INDEX "vote_userId_idx" ON "vote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "vote_voteSessionId_userId_key" ON "vote"("voteSessionId", "userId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "couple_member" ADD CONSTRAINT "couple_member_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "couple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "couple_member" ADD CONSTRAINT "couple_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_session" ADD CONSTRAINT "vote_session_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_voteSessionId_fkey" FOREIGN KEY ("voteSessionId") REFERENCES "vote_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
