// src/controllers/category.controller.js

const categoryService = require("../services/category.service");

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories();
      
      res.json({
        success: true,
        categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id || isNaN(id) || id <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      const category = await categoryService.getCategoryById(Number(id));

      res.json({
        success: true,
        category,
      });
    } catch (error) {
      if (error.message === "Category not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getSubCategories: async (req, res) => {
    try {
      const { categoryId } = req.params;

      if (!categoryId || isNaN(categoryId) || categoryId <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      const subCategories = await categoryService.getSubCategoriesByCategory(Number(categoryId));

      res.json({
        success: true,
        subCategories,
      });
    } catch (error) {
      if (error.message === "Category not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = categoryController;
