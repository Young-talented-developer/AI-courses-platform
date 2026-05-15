/**
 * Seed script for AI Courses Platform
 * This script initializes the database with categories, subcategories, and users
 * Run with: node prisma/seed.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// User data (passwords will be hashed)
const users = [
  {
    name: 'Admin User',
    phone: '0501234567',
    password: 'Admin@2024Secure!',
    isAdmin: true
  },
  {
    name: 'דני כהן',
    phone: '0512345678',
    password: 'DannyC#2024',
    isAdmin: false
  },
  {
    name: 'שרה לוי',
    phone: '0523456789',
    password: 'ShiraL@2024',
    isAdmin: false
  },
  {
    name: 'יוסי מזרחi',
    phone: '0534567890',
    password: 'YossiM#2024',
    isAdmin: false
  },
  {
    name: 'מיכל אברהם',
    phone: '0545678901',
    password: 'MichalA@2024',
    isAdmin: false
  },
  {
    name: 'רון שמש',
    phone: '0556789012',
    password: 'RonSh#2024',
    isAdmin: false
  },
  {
    name: 'נועה גולן',
    phone: '0567890123',
    password: 'NoaG@2024',
    isAdmin: false
  },
  {
    name: 'עידו ברק',
    phone: '0578901234',
    password: 'IdoB#2024',
    isAdmin: false
  }
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash passwords and create users
  console.log('👥 Creating users...');
  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await prisma.user.create({
      data: {
        name: userData.name,
        phone: userData.phone,
        password: hashedPassword,
        isAdmin: userData.isAdmin
      }
    });
    console.log(`   ✓ Created user: ${userData.name} (${userData.phone})`);
  }

  console.log('✅ Database seeded successfully!');
  console.log('');
  console.log('📝 Login credentials:');
  console.log('   Admin: phone: 0501234567, password: Admin@2024Secure!');
  console.log('   User:  phone: 0512345678, password: DannyC#2024');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });