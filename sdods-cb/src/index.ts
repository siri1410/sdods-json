import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const locationInfo = onRequest((request, response) => {
  const location = request.headers["x-appengine-city"] || "Unknown";
  const userAgent = request.headers["user-agent"] || "Unknown";

  logger.info(`Request received from ${location} using ${userAgent}`);

  const projection = {
    location: location,
    userAgent: userAgent,
    timestamp: new Date().toISOString(),
  };

  logger.info("Projection data:", projection);

  response.json({
    message: "Location and User Agent Information",
    data: projection,
  });
});
