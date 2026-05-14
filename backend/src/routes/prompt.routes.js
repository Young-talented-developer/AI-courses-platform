const express = require("express");

const router = express.Router();

const promptController =
  require("../controllers/prompt.controller");

const authMiddleware =
  require("../middleware/auth.middleware");

router.post(
  "/lesson",
  authMiddleware,
  promptController.createLesson
);

router.get(
  "/lessons",
  authMiddleware,
  promptController.getUserLessons
);

module.exports = router;