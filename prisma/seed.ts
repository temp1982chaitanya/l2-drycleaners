import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("123456", 10)
  const admin = await prisma.user.create({
    data: {
      email: "admin1@l2drycleaners.com",
      password: adminPassword,
      name: "Admin1",
      role: "ADMIN",
    },
  })

  console.log("Created admin user:", admin)

  // Create sample customers
  for (let i = 1; i <= 10; i++) {
    const customerPassword = await bcrypt.hash(`password${i}`, 10)
    const customer = await prisma.user.create({
      data: {
        email: `ab${i}@example.com`,
        password: customerPassword,
        name: `AB-${i}`,
        role: "CUSTOMER",
      },
    })
    console.log(`Created customer ${i}:`, customer)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

