import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Create a timeline based on order status
    const timeline = []
    const now = new Date()

    timeline.push({
      status: "PENDING_PICKUP",
      date: order.createdAt.toLocaleString(),
      completed: true,
    })

    if (
      order.status === "PICKED_UP" ||
      order.status === "PROCESSING" ||
      order.status === "READY_FOR_DELIVERY" ||
      order.status === "DELIVERED"
    ) {
      timeline.push({
        status: "PICKED_UP",
        date: new Date(order.pickupDate).toLocaleString(),
        completed: true,
      })
    }

    if (order.status === "PROCESSING" || order.status === "READY_FOR_DELIVERY" || order.status === "DELIVERED") {
      timeline.push({
        status: "PROCESSING",
        date: new Date(now.getTime() - 2 * 60 * 60 * 1000).toLocaleString(), // 2 hours after pickup
        completed: true,
      })
    }

    if (order.status === "READY_FOR_DELIVERY" || order.status === "DELIVERED") {
      timeline.push({
        status: "READY_FOR_DELIVERY",
        date: new Date(now.getTime() - 1 * 60 * 60 * 1000).toLocaleString(), // 1 hour after processing
        completed: true,
      })
    }

    if (order.status === "DELIVERED") {
      timeline.push({
        status: "DELIVERED",
        date: order.deliveryDate?.toLocaleString() || now.toLocaleString(),
        completed: true,
      })
    }

    return NextResponse.json({
      id: order.id,
      status: order.status,
      customer: order.user,
      items: order.items,
      totalAmount: order.totalAmount,
      pickupDate: order.pickupDate,
      deliveryDate: order.deliveryDate,
      timeline,
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 })
  }
}

