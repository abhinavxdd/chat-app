import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const publisher = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

export const subscriber = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

publisher.on("connect", () => {
  console.log("✅ Redis Publisher connected");
});

publisher.on("error", (err) => {
  console.error("❌ Redis Publisher error:", err);
});

publisher.on("ready", () => {
  console.log("🚀 Redis Publisher ready");
});

subscriber.on("connect", () => {
  console.log("✅ Redis Subscriber connected");
});

subscriber.on("error", (err) => {
  console.error("❌ Redis Subscriber error:", err);
});

subscriber.on("ready", () => {
  console.log("🚀 Redis Subscriber ready");
});

process.on("SIGTERM", async () => {
  console.log("Closing Redis connections...");
  await publisher.quit();
  await subscriber.quit();
  process.exit(0);
});
