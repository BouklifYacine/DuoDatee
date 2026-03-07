import { vi, beforeEach, afterEach } from "vitest";

// ============================================
// MOCK PRISMA
// ============================================

const mockUser = {
  id: "test-user-id",
  name: "Test User",
  email: "test@example.com",
  emailVerified: false,
  image: null,
  age: 25,
  gender: "homme" as const,
  avatarPlaceholder: "TU",
  preferredTypes: ["bouffe", "boire", "activite"],
  preferredBudget: "moyen" as const,
  preferredDistance: 5,
  hasCompletedOnboarding: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Create mock functions
const mockUserFindUnique = vi.fn();
const mockUserFindFirst = vi.fn();
const mockUserUpdate = vi.fn();
const mockCoupleFindFirst = vi.fn();
const mockCoupleCreate = vi.fn();
const mockCoupleUpdate = vi.fn();
const mockGetSession = vi.fn();

const mockPrisma = {
  user: {
    findUnique: mockUserFindUnique,
    findFirst: mockUserFindFirst,
    update: mockUserUpdate,
    create: vi.fn(),
    delete: vi.fn(),
  },
  couple: {
    findUnique: vi.fn(),
    findFirst: mockCoupleFindFirst,
    update: mockCoupleUpdate,
    create: mockCoupleCreate,
    delete: vi.fn(),
  },
  coupleMember: {
    findFirst: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
  $transaction: vi.fn((callback) => callback(mockPrisma)),
};

// Mock du module prisma
vi.mock("../lib/prisma", () => ({
  prisma: mockPrisma,
}));

// ============================================
// MOCK AUTH (Better Auth)
// ============================================

const mockSession = {
  user: {
    id: "test-user-id",
    name: "Test User",
    email: "test@example.com",
    image: null,
  },
  session: {
    id: "test-session-id",
    expiresAt: new Date(Date.now() + 86400000),
    token: "test-token",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const mockAuth = {
  api: {
    getSession: mockGetSession,
  },
  $Infer: {
    Session: {
      user: mockSession.user,
      session: mockSession.session,
    },
  },
};

vi.mock("../lib/auth", () => ({
  auth: mockAuth,
}));

// ============================================
// EXPORTS
// ============================================

export { mockPrisma, mockAuth, mockUser, mockSession, mockUserFindUnique, mockUserFindFirst, mockUserUpdate, mockCoupleFindFirst, mockCoupleCreate, mockCoupleUpdate, mockGetSession };

// ============================================
// BEFORE EACH
// ============================================

beforeEach(() => {
  vi.clearAllMocks();
  
  // Reset mock implementations by default
  mockUserFindUnique.mockResolvedValue(mockUser);
  mockUserFindFirst.mockResolvedValue(null);
  mockUserUpdate.mockResolvedValue({
    ...mockUser,
    name: "Updated Name",
  });
  mockCoupleFindFirst.mockResolvedValue(null);
  mockCoupleCreate.mockResolvedValue({
    id: "new-couple-id",
    status: "pending" as const,
    relationshipDuration: "un_trois_ans" as const,
    relationshipStatus: "en_couple" as const,
    livingSituation: "ensemble" as const,
    inviteToken: null,
    inviteCode: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  mockGetSession.mockResolvedValue(mockSession);
});

afterEach(() => {
  vi.resetAllMocks();
});
