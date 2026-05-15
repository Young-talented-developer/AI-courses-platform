const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
  async findByPhone(phone) {
    return await prisma.user.findFirst({ where: { phone } });
  }

  async create(userData) {
    return await prisma.user.create({ data: userData });
  }

  async findById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        isAdmin: true,
        prompts: {
          select: {
            id: true,
            promptText: true,
            aiResponse: true,
            createdAt: true,
            category: {
              select: { id: true, name: true }
            },
            subCategory: {
              select: { id: true, name: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}

module.exports = new UserRepository();