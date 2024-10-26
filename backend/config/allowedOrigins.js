const origin =
  process.env.NODE_ENV === "production"
    ? [process.env.CLIENT_URL]
    : ["http://localhost:5173", "http://localhost:3500"];

console.log("client url is", process.env.CLIENT_URL);

const allowedOrigins = origin;

module.exports = allowedOrigins;
