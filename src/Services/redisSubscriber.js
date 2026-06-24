import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.subscribe("upcoming-messages", (err) => {
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
    return;
  }
  console.log("Subscribed successfully");
});

redis.on("message", (channel, message) => {
  console.log("Recevied on ", channel, ":", JSON.parse(message));
});
