require('dotenv').config();
const express = require('express');
const cors = require('cors');

// ייבוא ה-Routes (נתיבים)
const authRoutes = require('./routes/auth.routes');
const promptRoutes = require("./routes/prompt.routes");

const app = express();


// --- Middlewares גלובליים ---
app.use(cors()); // מאפשר ל-Frontend לגשת לשרת
app.use(express.json()); // מאפשר לשרת לקרוא JSON מגוף הבקשה (req.body)
console.log("Checking if Prompt Routes are loaded...");
app.use("/api/prompts", promptRoutes);

// --- חיבור ה-Routes ---
// כל הנתיבים של ה-Auth יתחילו ב- /api/auth
console.log("Loading Auth Routes...");
app.use('/api/auth', authRoutes);

// נתיב בדיקה בסיסי כדי לראות שהשרת חי
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// --- טיפול בשגיאות גלובלי (Error Handling) ---
// תמיד כדאי שיהיה מנגנון שתופס שגיאות שלא טופלו
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'משהו השתבש בשרת!' });
});

const PORT = process.env.PORT || 5000;

// הוספת '0.0.0.0' היא קריטית עבור Docker
app.listen(PORT, '0.0.0.0', () => {
  console.log(`-----------------------------------------`);
  console.log(`🚀 Server is flying on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`-----------------------------------------`);
});