const origin =
  process.env.NODE_ENV === "production"
    ? [process.env.CLIENT_URL]
    : ["http://localhost:5173", "http://localhost:3500"];

const allowedOrigins = origin;

console.log(allowedOrigins)

module.exports = allowedOrigins;
