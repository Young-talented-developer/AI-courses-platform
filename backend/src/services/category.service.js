// src/services/category.service.js

const prisma = require("../config/prisma");

const categoryService = {
  getAllCategories: async () => {
    const categories = await prisma.category.findMany({
      include: {
        subCategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return categories;
  },

  getCategoryById: async (categoryId) => {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        subCategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  },

  getSubCategoriesByCategory: async (categoryId) => {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const subCategories = await prisma.subCategory.findMany({
      where: {
        categoryId: categoryId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return subCategories;
  },
};

module.exports = categoryService;
