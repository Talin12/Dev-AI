import { Redis } from "ioredis";

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (redisClient) return redisClient;

  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error("REDIS_URL is not defined in environment variables");
  }

  redisClient = new Redis(url, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    lazyConnect: true,
    tls: url.startsWith("rediss://") ? {} : undefined,
  });

  redisClient.on("connect", () => console.log("Redis connected"));
  redisClient.on("error", (err) => console.error("Redis error:", err));

  return redisClient;
}

export function getBullMQRedisConnection(): Redis {
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error("REDIS_URL is not defined in environment variables");
  }

  return new Redis(url, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    tls: url.startsWith("rediss://") ? {} : undefined,
  });
}

const DEFAULT_TTL = 60 * 60;

export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds = DEFAULT_TTL
): Promise<void> {
  const client = getRedisClient();
  await client.setex(key, ttlSeconds, JSON.stringify(value));
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = getRedisClient();
  const raw = await client.get(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function cacheDel(key: string): Promise<void> {
  const client = getRedisClient();
  await client.del(key);
}

export const keys = {
  paper: (assignmentId: string) => `paper:${assignmentId}`,
  assignment: (assignmentId: string) => `assignment:${assignmentId}`,
};