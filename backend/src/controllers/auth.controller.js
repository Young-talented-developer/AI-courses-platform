const authService = require('../services/auth.service');

class AuthController {
  async register(req, res) {
    try {
      const { name, phone, password } = req.body;
      const user = await authService.registerUser(name, phone, password);
      res.status(201).json({ message: "User registered successfully", userId: user.id });
    } catch (error) {
      res.status(400).json({ error: "Registration failed" });
    }
  }

  async login(req, res) {
    try {
      const { phone, password } = req.body;
      const user = await authService.validateUser(phone, password);
      
      if (!user) {
        return res.status(401).json({ error: "Invalid phone or password" });
      }

      const token = authService.generateToken(user.id);
      res.json({ 
        token,
        user: { id: user.id, name: user.name } 
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new AuthController();