"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Home, Package, Clock, Truck, CheckCircle, Star, LogOut, User, Settings, Menu, X, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeOrders, setActiveOrders] = useState<any[]>([])
  const [pastOrders, setPastOrders] = useState<any[]>([])

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const session = await response.json()

        if (!session || !session.user) {
          router.push("/login")
          return
        }

        setUser(session.user)

        // Fetch user's orders
        fetchOrders()

        setLoading(false)
      } catch (error) {
        console.error("Error checking session:", error)
        router.push("/login")
      }
    }

    checkUser()
  }, [router])

  const fetchOrders = async () => {
    // In a real app, you would fetch from your database
    // For demo purposes, we'll use mock data

    setActiveOrders([
      {
        id: "ORD-001",
        date: "2023-06-15",
        items: [
          { name: "Shirts", quantity: 3, price: 15 },
          { name: "Pants", quantity: 2, price: 20 },
        ],
        total: 65,
        status: "pickup",
        statusText: "Scheduled for Pickup",
        pickupDate: "2023-06-16",
        pickupTime: "10:00 AM - 12:00 PM",
      },
      {
        id: "ORD-002",
        date: "2023-06-10",
        items: [
          { name: "Suits", quantity: 1, price: 25 },
          { name: "Dresses", quantity: 2, price: 30 },
        ],
        total: 85,
        status: "processing",
        statusText: "Under Processing",
        pickupDate: "2023-06-12",
        pickupTime: "2:00 PM - 4:00 PM",
        deliveryDate: "2023-06-14",
        deliveryTime: "10:00 AM - 12:00 PM",
      },
    ])

    setPastOrders([
      {
        id: "ORD-003",
        date: "2023-05-25",
        items: [
          { name: "Shirts", quantity: 5, price: 25 },
          { name: "Pants", quantity: 3, price: 30 },
        ],
        total: 115,
        status: "completed",
        statusText: "Delivered",
        pickupDate: "2023-05-26",
        deliveryDate: "2023-05-28",
        rated: true,
        rating: 5,
        review: "Excellent service! My clothes came back perfectly clean.",
      },
      {
        id: "ORD-004",
        date: "2023-05-15",
        items: [
          { name: "Bedsheets", quantity: 2, price: 40 },
          { name: "Curtains", quantity: 1, price: 35 },
        ],
        total: 75,
        status: "completed",
        statusText: "Delivered",
        pickupDate: "2023-05-16",
        deliveryDate: "2023-05-19",
        rated: false,
      },
    ])
  }

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" })
    router.push("/login")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pickup":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "processing":
        return <Package className="h-5 w-5 text-sky-500" />
      case "delivery":
        return <Truck className="h-5 w-5 text-purple-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Image src="/blue-lotus-logo.svg" alt="L2 Dry Cleaners Logo" width={40} height={40} />
            <span className="text-xl font-bold text-sky-600">L2 Dry Cleaners</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-sky-50 text-sky-600"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/orders"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Package className="h-5 w-5" />
            My Orders
          </Link>
          <Link
            href="/dashboard/schedule"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Clock className="h-5 w-5" />
            Schedule Pickup
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
            My Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 bg-white md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Image src="/blue-lotus-logo.svg" alt="L2 Dry Cleaners Logo" width={40} height={40} />
              <span className="text-xl font-bold text-sky-600">L2 Dry Cleaners</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-sky-50 text-sky-600"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Package className="h-5 w-5" />
              My Orders
            </Link>
            <Link
              href="/dashboard/schedule"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Clock className="h-5 w-5" />
              Schedule Pickup
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <User className="h-5 w-5" />
              My Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Welcome, {user?.user_metadata?.full_name || "User"}</span>
              <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center">
                <User className="h-4 w-4 text-sky-600" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeOrders.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Completed Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pastOrders.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${[...activeOrders, ...pastOrders].reduce((sum, order) => sum + order.total, 0)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="active">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="active">Active Orders</TabsTrigger>
                  <TabsTrigger value="past">Past Orders</TabsTrigger>
                </TabsList>
                <Link href="/dashboard/schedule">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    New Order
                  </Button>
                </Link>
              </div>

              <TabsContent value="active" className="mt-4 space-y-4">
                {activeOrders.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <Package className="h-10 w-10 text-gray-400 mb-4" />
                      <p className="text-gray-500">You don't have any active orders</p>
                      <Link href="/dashboard/schedule" className="mt-4">
                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Schedule a Pickup</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  activeOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                          <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100">{order.statusText}</Badge>
                        </div>
                        <CardDescription>Placed on {order.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>
                                    {item.name} x{item.quantity}
                                  </span>
                                  <span>${item.price.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                          <div className="pt-2 border-t">
                            <div className="flex items-center gap-2 text-sm">
                              {getStatusIcon(order.status)}
                              <div>
                                {order.status === "pickup" && (
                                  <p>
                                    Pickup scheduled for {order.pickupDate} between {order.pickupTime}
                                  </p>
                                )}
                                {order.status === "processing" && (
                                  <>
                                    <p>Picked up on {order.pickupDate}</p>
                                    <p>
                                      Estimated delivery on {order.deliveryDate} between {order.deliveryTime}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-4 space-y-4">
                {pastOrders.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <Package className="h-10 w-10 text-gray-400 mb-4" />
                      <p className="text-gray-500">You don't have any past orders</p>
                    </CardContent>
                  </Card>
                ) : (
                  pastOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{order.statusText}</Badge>
                        </div>
                        <CardDescription>Placed on {order.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Items</h4>
                            <div className="space-y-2">
                              {order.items.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>
                                    {item.name} x{item.quantity}
                                  </span>
                                  <span>${item.price.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                          <div className="pt-2 border-t">
                            <div className="flex items-center gap-2 text-sm">
                              {getStatusIcon(order.status)}
                              <div>
                                <p>Delivered on {order.deliveryDate}</p>
                              </div>
                            </div>
                          </div>
                          {order.rated && (
                            <div className="pt-2 border-t">
                              <h4 className="text-sm font-medium mb-2">Your Rating</h4>
                              <div className="flex items-center gap-1 mb-2">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < order.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                    />
                                  ))}
                              </div>
                              <p className="text-sm text-gray-500 italic">"{order.review}"</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          Order Again
                        </Button>
                        {!order.rated && (
                          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black" size="sm">
                            Rate Order
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

