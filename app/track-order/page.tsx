"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderStatus } from "@prisma/client"

interface OrderItem {
  id: string
  serviceType: string
  quantity: number
  price: number
}

interface TimelineItem {
  status: OrderStatus
  date: string
  completed: boolean
}

interface OrderDetails {
  id: string
  status: OrderStatus
  customer: {
    name: string
    email: string
  }
  items: OrderItem[]
  totalAmount: number
  pickupDate: string
  deliveryDate: string | null
  timeline: TimelineItem[]
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    if (!orderId) {
      setError("Please enter an order ID")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/orders/track?orderId=${orderId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch order details")
      }

      setOrderDetails(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING_PICKUP":
        return "bg-yellow-500"
      case "PICKED_UP":
        return "bg-blue-500"
      case "PROCESSING":
        return "bg-purple-500"
      case "READY_FOR_DELIVERY":
        return "bg-green-500"
      case "DELIVERED":
        return "bg-gray-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-4 mb-8">
          <Input
            type="text"
            placeholder="Enter your order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <Button 
            onClick={handleTrack} 
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
            disabled={loading}
          >
            {loading ? "Tracking..." : "Track"}
          </Button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {orderDetails && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{orderDetails.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{orderDetails.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{orderDetails.status.replace(/_/g, " ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">₹{orderDetails.totalAmount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.serviceType}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-6">
                    {orderDetails.timeline.map((step, index) => (
                      <div key={index} className="relative flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${getStatusColor(step.status)}`}></div>
                        <div>
                          <p className="font-medium">{step.status.replace(/_/g, " ")}</p>
                          <p className="text-sm text-gray-500">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 