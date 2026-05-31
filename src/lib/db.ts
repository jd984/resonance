import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env";

/**
 * Creates a PostgreSQL adapter using the DATABASE_URL.
 * Prisma will use this adapter to communicate with the PostgreSQL database.
 */
const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

/**
 * Extends the global object with a prisma property.
 *
 * Why?
 * In development, Next.js hot-reloads files whenever code changes.
 * Without storing the Prisma instance globally, a new PrismaClient
 * would be created on every reload, eventually exhausting the
 * database connection pool and causing errors like:
 *
 * "Too many database connections"
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Reuse the existing PrismaClient instance if it already exists.
 * Otherwise, create a new one.
 */
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

/**
 * Store the PrismaClient instance on the global object only in development.
 *
 * Development:
 *   - Reuses the same PrismaClient across hot reloads.
 *   - Prevents creating multiple database connections.
 *
 * Production:
 *   - Each server instance creates its own PrismaClient once.
 *   - Global caching is unnecessary because hot reloading doesn't occur.
 */
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Export a singleton PrismaClient instance.
 *
 * Usage:
 *
 * import { prisma } from "@/lib/prisma";
 *
 * const users = await prisma.user.findMany();
 */
export { prisma };
