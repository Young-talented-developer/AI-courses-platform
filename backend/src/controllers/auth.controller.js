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

      const user = await authService.registerUser(name, phone, password, false);
      const token = authService.generateToken(user.id);
      res.status(201).json({ 
        message: "User registered successfully", 
        token,
        user: { id: user.id, name: user.name, isAdmin: user.isAdmin }
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
        user: { id: user.id, name: user.name, isAdmin: user.isAdmin } 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: token missing or invalid',
        });
      }

      const userId = req.user.userId || req.user.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: invalid token payload',
        });
      }

      // Check if user is admin
      const prisma = require("../config/prisma");
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user || !user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can view all users',
        });
      }

      const users = await authService.getAllUsers();

      return res.status(200).json({
        success: true,
        users,
        total: users.length,
      });
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();