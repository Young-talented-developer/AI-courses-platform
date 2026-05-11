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
}

module.exports = new UserRepository();