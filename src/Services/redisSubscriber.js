import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.subscribe("upcoming-messages", (err) => {
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
    return;
  }
  console.log("Subscribed successfully");
});

const initializeSubscriber = (io) => {
  redis.on("message", (channel, message) => {
    const parsedMessage = JSON.parse(message);
    io.to(parsedMessage.roomId).emit("receive-message", parsedMessage.message);
  });
};

export { initializeSubscriber };
