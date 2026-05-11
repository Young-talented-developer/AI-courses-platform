const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/auth.config');
const userRepository = require('../repositories/user.repository');

class AuthService {
  async registerUser(name, phone, password) {
    const hashedPassword = await bcrypt.hash(password, config.saltRounds);
    return await userRepository.create({
      name,
      phone,
      password: hashedPassword
    });
  }

  async validateUser(phone, password) {
    const user = await userRepository.findByPhone(phone);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

  generateToken(userId) {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpiration });
  }
}

module.exports = new AuthService();