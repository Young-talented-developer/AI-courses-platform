// src/controllers/prompt.controller.js

const promptService =
  require("../services/prompt.service");

const promptController = {

  createLesson: async (req, res) => {

    try {

      const {
        categoryId,
        subCategoryId,
        promptText,
      } = req.body;

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

      if (!categoryId || !subCategoryId || !promptText) {
        return res.status(400).json({
          success: false,
          message: 'categoryId, subCategoryId and promptText are required',
        });
      }

      const lesson =
        await promptService.createLesson(
          userId,
          categoryId,
          subCategoryId,
          promptText
        );

      return res.status(201).json({
        success: true,
        lesson,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getUserLessons: async (req, res) => {
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

      const lessons = await promptService.getLessonsByUser(userId);

      return res.status(200).json({
        success: true,
        lessons,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAllLessons: async (req, res) => {
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

      // Get user info to check if admin
      const prisma = require("../config/prisma");
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user || !user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Only admins can view all lessons',
        });
      }

      const lessons = await promptService.getAllLessons();

      return res.status(200).json({
        success: true,
        lessons,
        total: lessons.length,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = promptController;