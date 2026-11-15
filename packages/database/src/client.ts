import { PrismaClient } from '@prisma/client';

declare global {
  var __prisma: PrismaClient | undefined;
}

const NOT_GENERATED =
  '@prisma/client has not been generated. Run `pnpm --filter @visahobe/database db:generate` before using the database layer.';

function notGenerated(): never {
  throw new Error(NOT_GENERATED);
}

/**
 * Stand-in used when the Prisma client has not been generated yet.
 *
 * Unit tests, typecheck and a fresh clone all import modules that re-export
 * `prisma` without ever touching a database. Failing at import time would make
 * those modules unusable for reasons unrelated to the code under test, so we
 * expose a stub whose *call sites* fail loudly instead. The interaction points
 * that tests spy on (`$transaction`, raw queries, `$disconnect`) are real own
 * properties so mocking works exactly as it does against a generated client.
 */
function createStubClient(): PrismaClient {
  const base = {
    $transaction: notGenerated,
    $executeRaw: notGenerated,
    $executeRawUnsafe: notGenerated,
    $queryRaw: notGenerated,
    $queryRawUnsafe: notGenerated,
    $connect: notGenerated,
    $disconnect: notGenerated,
    $extends: notGenerated,
  } as unknown as PrismaClient;

  return new Proxy(base, {
    get(target, prop, receiver) {
      if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver);
      if (typeof prop === 'symbol') return undefined;
      // Any model delegate (`prisma.case`, `prisma.tenant`, …) fails on use.
      return new Proxy(
        {},
        {
          get: () => notGenerated,
        },
      );
    },
  });
}

function createClient(): PrismaClient {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  } catch {
    return createStubClient();
  }
}

export const prisma: PrismaClient = globalThis.__prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

export * from '@prisma/client';
