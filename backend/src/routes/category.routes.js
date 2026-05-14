// src/routes/category.routes.js

const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

// GET all categories
router.get("/", categoryController.getAllCategories);

// GET single category with subcategories
router.get("/:id", categoryController.getCategoryById);

// GET subcategories of a category
router.get("/:categoryId/subcategories", categoryController.getSubCategories);

module.exports = router;
