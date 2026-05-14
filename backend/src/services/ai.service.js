// src/services/ai.service.js

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const aiService = {

  generateLesson: async (messages) => {

    try {

      const completion =
        await openai.chat.completions.create({

          model: "gpt-4o",

          messages,

          temperature: 0.7,

          max_tokens: 1500,
        });

      return completion.choices[0].message.content;

    } catch (error) {

      console.error("AI Service Error:", error);

      throw new Error("Failed to generate lesson");
    }
  },
};

module.exports = aiService;