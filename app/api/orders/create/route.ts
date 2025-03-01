import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, items, pickupDate } = body

    if (!userId || !items || !pickupDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum: number, item: { quantity: number; price: number }) => 
        sum + (item.quantity * item.price),
      0
    )

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        pickupDate: new Date(pickupDate),
        items: {
          create: items.map((item: { serviceType: string; quantity: number; price: number }) => ({
            serviceType: item.serviceType,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
} 