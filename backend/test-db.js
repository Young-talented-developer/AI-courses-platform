const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. יצירת משתמש חדש
  const newUser = await prisma.user.create({
    data: {
      name: 'ישראל ישראלי',
      phone: '0501234567',
    },
  });
  console.log('נוצר משתמש חדש:', newUser);

  // 2. שליפת כל המשתמשים
  const allUsers = await prisma.user.findMany();
  console.log('כל המשתמשים ב-DB:', allUsers);
}

main()
  .catch((e) => console.error('שגיאה בחיבור:', e))
  .finally(async () => await prisma.$disconnect());