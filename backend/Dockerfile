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

# שלב 6: התקנת netcat לבדיקת זמינות ה-DB
RUN apk add --no-cache netcat-openbsd

# שלב 7: העתקת סקריפט האתחול
COPY prisma/init-db.sh /init-db.sh
RUN chmod +x /init-db.sh

# שלב 8: חשיפת הפורט
EXPOSE 5000

# שלב 9: הרצה עם אתחול מסד הנתונים וזריעת נתוני דמה
CMD ["/init-db.sh"]
