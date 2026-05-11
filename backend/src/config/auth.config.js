module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  jwtExpiration: '1h',
  saltRounds: 10
};