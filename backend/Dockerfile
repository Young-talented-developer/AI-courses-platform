# שלב 1: בחירת מערכת הפעלה עם Node
FROM node:20-alpine

# שלב 2: הגדרת תיקיית העבודה
WORKDIR /app

# שלב 3: התקנת תלויות (dependencies)
COPY package*.json ./
RUN npm install

# שלב 4: העתקת כל שאר הקוד
COPY . .

# שלב 5: יצירת Prisma Client
RUN npx prisma generate

# שלב 6: חשיפת הפורט
EXPOSE 5000


# שלב 7: הרצה
CMD ["npm", "start"]