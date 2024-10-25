const origin = process.env.NODE_ENV === 'production' 
    ? ['https://movie-brain.netlify.app/']
    : ['http://localhost:5173', 'http://localhost:3500'];

const allowedOrigins = origin;

module.exports = allowedOrigins;
