const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10)
  const empPassword = await bcrypt.hash('emp123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@hrms.com' },
    update: {},
    create: {
      employeeId: 'ADM-001',
      name: 'Admin User',
      email: 'admin@hrms.com',
      password: adminPassword,
      role: 'ADMIN',
      jobDetails: 'System Administrator',
    },
  })

  const employee = await prisma.user.upsert({
    where: { email: 'employee@hrms.com' },
    update: {},
    create: {
      employeeId: 'EMP-001',
      name: 'Regular Employee',
      email: 'employee@hrms.com',
      password: empPassword,
      role: 'EMPLOYEE',
      jobDetails: 'Software Engineer',
    },
  })

  console.log({ admin, employee })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
