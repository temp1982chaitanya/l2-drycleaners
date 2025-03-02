import { Prisma } from "@prisma/client"

const prisma = new Prisma()

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "ADMIN" | "CUSTOMER"
  createdAt: Date
  orders: Order[]
}

export interface Order {
  id: string
  userId: string
  status: "PENDING_PICKUP" | "PICKED_UP" | "PROCESSING" | "READY_FOR_DELIVERY" | "DELIVERED"
  items: OrderItem[]
  totalAmount: number
  pickupDate: Date
  deliveryDate: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  serviceType: string
  quantity: number
  price: number
}

// Sample admin user
export const adminUser = {
  id: "admin1",
  email: "admin1@l2drycleaners.com",
  password: "admin1234", // In production, this should be hashed
  name: "Admin1",
  role: "ADMIN" as const,
  createdAt: new Date(),
}

// Sample customers
export const sampleCustomers = Array.from({ length: 10 }, (_, i) => ({
  id: `customer-${i + 1}`,
  email: `ab${i + 1}@example.com`,
  password: `password${i + 1}`, // In production, these should be hashed
  name: `AB-${i + 1}`,
  role: "CUSTOMER" as const,
  createdAt: new Date(),
}))

export { prisma }

