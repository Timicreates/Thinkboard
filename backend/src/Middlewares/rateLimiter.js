import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  const key = req.ip || "global";

  try {
    const { success } = await ratelimit
      .limit(key)
      .catch(() => ({ success: true }));

    if (!success) {
      return res.status(429).json({ message: "Too many message requests" });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    return res.status(500).json({ message: "Rate limiting unavailable" });
    // next(error);
  }
};
export default rateLimiter;
