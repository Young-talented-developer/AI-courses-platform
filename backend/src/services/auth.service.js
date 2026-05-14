const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/auth.config');
const userRepository = require('../repositories/user.repository');
const { validateName, validatePhone, validatePassword } = require('../validatores/validators');

class AuthService {
  async registerUser(name, phone, password, isAdmin = false) {
    // Validate inputs
    const validatedName = validateName(name);
    const validatedPhone = validatePhone(phone);
    const validatedPassword = validatePassword(password);

    // Check if phone already exists
    const existingUser = await userRepository.findByPhone(validatedPhone);
    if (existingUser) {
      throw new Error("Phone number already registered");
    }

    const hashedPassword = await bcrypt.hash(validatedPassword, config.saltRounds);
    return await userRepository.create({
      name: validatedName,
      phone: validatedPhone,
      password: hashedPassword,
      isAdmin: Boolean(isAdmin)
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