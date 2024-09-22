const origin = process.env.NODE_ENV === 'production' ? ['https://movie-brain.netlify.app'] : ['http://localhost:5173', 'localhost:3500']

console.log(origin)

//where can requess come from
const allowedOrigins = origin

module.exports = allowedOrigins