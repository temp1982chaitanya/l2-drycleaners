import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, status, deliveryDate } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    // Only admins can update order status
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Only admins can update order status" }, { status: 403 })
    }

    const updateData: any = {}

    if (status) {
      updateData.status = status
    }

    if (deliveryDate) {
      updateData.deliveryDate = new Date(deliveryDate)
    }

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
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
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

