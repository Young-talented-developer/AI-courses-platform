// src/services/prompt.service.js

const prisma = require("../config/prisma");

const aiService = require("./ai.service");

const promptService = {

  createLesson: async (
    userId,
    categoryId,
    subCategoryId,
    promptText
  ) => {

    // =========================
    // Validation
    // =========================

    if (!promptText || promptText.trim().length < 3) {
      throw new Error("Prompt is required");
    }

    // =========================
    // Find category
    // =========================

    const category =
      await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

    if (!category) {
      throw new Error("Category not found");
    }

    // =========================
    // Find sub category
    // =========================

    const subCategory =
      await prisma.subCategory.findUnique({
        where: {
          id: subCategoryId,
        },
      });

    if (!subCategory) {
      throw new Error("Sub category not found");
    }

    // =========================
    // Verify relation
    // =========================

    if (subCategory.categoryId !== category.id) {

      throw new Error(
        "Sub category does not belong to category"
      );
    }

    // =========================
    // Build AI Prompt
    // =========================

    const finalPrompt = `
Create a professional programming lesson.

Category:
${category.name}

Sub Category:
${subCategory.name}

Student Request:
${promptText}

Requirements:
- Only teach the requested topic
- Beginner friendly
- Clear explanations
- Step by step
- Include code examples
- Include common mistakes
- Include mini exercise
- Use markdown formatting

Lesson Structure:
1. Title
2. Introduction
3. Main Explanation
4. Code Examples
5. Common Mistakes
6. Summary
7. Mini Exercise
`;

    // =========================
    // Messages
    // =========================

    const messages = [

      {
        role: "system",

        content: `
You are an AI teacher for a software learning platform.

Allowed subjects:
- programming
- web development
- databases
- algorithms
- software engineering
- AI

Never answer unrelated topics.
`,
      },

      {
        role: "user",

        content: finalPrompt,
      },
    ];

    // =========================
    // Generate AI lesson
    // =========================

    const aiResponse =
      await aiService.generateLesson(messages);

    // =========================
    // Save lesson
    // =========================

    const lesson =
      await prisma.prompt.create({

        data: {

          userId,

          categoryId,

          subCategoryId,

          promptText,

          aiResponse,
        },
      });

    return lesson;
  },
};

module.exports = promptService;