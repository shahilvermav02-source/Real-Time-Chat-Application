import Redis from "ioredis";
const publisher = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const broadcast = async (messageBody) => {
  await publisher.publish("upcoming-messages", JSON.stringify(messageBody));
};
export { broadcast };
