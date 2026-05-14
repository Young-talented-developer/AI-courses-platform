const authService = require('../services/auth.service');

class AuthController {
  async register(req, res) {
    try {
      const { name, phone, password } = req.body;

      // Validate required fields
      if (!name || !phone || !password) {
        return res.status(400).json({ 
          error: "name, phone and password are required" 
        });
      }

      const user = await authService.registerUser(name, phone, password);
      res.status(201).json({ 
        message: "User registered successfully", 
        userId: user.id 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { phone, password } = req.body;

      // Validate required fields
      if (!phone || !password) {
        return res.status(400).json({ 
          error: "phone and password are required" 
        });
      }

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
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();