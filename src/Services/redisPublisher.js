import Redis from "ioredis";
const publisher = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const publishmessage = async (messageBody) => {
  await publisher.publish("upcoming-messages", JSON.stringify(messageBody));
};
export { publishmessage };
