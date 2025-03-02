"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Home,
  Package,
  Users,
  Settings,
  LogOut,
  Search,
  BarChart3,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Menu,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { OrderStatus } from "@prisma/client"

interface Order {
  id: string
  customerName: string
  status: OrderStatus
  totalAmount: number
  pickupDate: string
  deliveryDate: string | null
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingPickup: 0,
    processing: 0,
    readyForDelivery: 0,
  })

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const session = await response.json()

        if (!session || !session.user) {
          router.push("/login")
          return
        }

        // Check if user is admin
        if (session.user.role !== "ADMIN") {
          router.push("/dashboard")
          return
        }

        setUser(session.user)

        // Fetch data
        fetchData()

        setLoading(false)
      } catch (error) {
        console.error("Error checking session:", error)
        router.push("/login")
      }
    }

    checkUser()
  }, [router])

  const fetchData = async () => {
    // In a real app, you would fetch from your database
    // For demo purposes, we'll use mock data

    const mockOrders: Order[] = [
      {
        id: "ord-1",
        customerName: "AB-1",
        status: "PENDING_PICKUP",
        totalAmount: 250,
        pickupDate: "2024-03-01",
        deliveryDate: null,
      },
      {
        id: "ord-2",
        customerName: "AB-2",
        status: "PROCESSING",
        totalAmount: 350,
        pickupDate: "2024-03-01",
        deliveryDate: "2024-03-03",
      },
      // Add more mock orders as needed
    ]

    setOrders(mockOrders)
    setStats({
      totalOrders: mockOrders.length,
      pendingPickup: mockOrders.filter((o) => o.status === "PENDING_PICKUP").length,
      processing: mockOrders.filter((o) => o.status === "PROCESSING").length,
      readyForDelivery: mockOrders.filter((o) => o.status === "READY_FOR_DELIVERY").length,
    })

    setCustomers([
      {
        id: "CUST-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        address: "123 Main St, New York, NY",
        orders: 5,
        totalSpent: 250,
        joinDate: "2023-01-15",
      },
      {
        id: "CUST-002",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1987654321",
        address: "456 Park Ave, New York, NY",
        orders: 3,
        totalSpent: 180,
        joinDate: "2023-02-20",
      },
      {
        id: "CUST-003",
        name: "Michael Johnson",
        email: "michael@example.com",
        phone: "+1122334455",
        address: "789 Broadway, New York, NY",
        orders: 7,
        totalSpent: 420,
        joinDate: "2023-01-05",
      },
      {
        id: "CUST-004",
        name: "Sarah Williams",
        email: "sarah@example.com",
        phone: "+1555666777",
        address: "321 5th Ave, New York, NY",
        orders: 2,
        totalSpent: 95,
        joinDate: "2023-03-10",
      },
    ])

    setEmployees([
      {
        id: "EMP-001",
        name: "Robert Chen",
        email: "robert@l1drycleaners.com",
        phone: "+1234567890",
        role: "Manager",
        joinDate: "2022-01-10",
      },
      {
        id: "EMP-002",
        name: "Lisa Kim",
        email: "lisa@l1drycleaners.com",
        phone: "+1987654321",
        role: "Cleaner",
        joinDate: "2022-03-15",
      },
      {
        id: "EMP-003",
        name: "David Patel",
        email: "david@l1drycleaners.com",
        phone: "+1122334455",
        role: "Delivery",
        joinDate: "2022-02-20",
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
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pickup":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Scheduled for Pickup</Badge>
      case "processing":
        return <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100">Under Processing</Badge>
      case "delivery":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Out for Delivery</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus as OrderStatus } : order)))
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
            <span className="text-xl font-bold text-sky-600">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-sky-50 text-sky-600"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Package className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Users className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="/admin/employees"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Users className="h-5 w-5" />
            Employees
          </Link>
          <Link
            href="/admin/reports"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
          >
            <BarChart3 className="h-5 w-5" />
            Reports
          </Link>
          <Link
            href="/admin/settings"
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
              <span className="text-xl font-bold text-sky-600">Admin Panel</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-sky-50 text-sky-600"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Package className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/admin/customers"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Users className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="/admin/employees"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Users className="h-5 w-5" />
              Employees
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <BarChart3 className="h-5 w-5" />
              Reports
            </Link>
            <Link
              href="/admin/settings"
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
              <Button variant="ghost" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Input type="search" placeholder="Search..." className="max-w-sm" />
              <Button>
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>All orders placed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalOrders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Customers</CardTitle>
                <CardDescription>Customers joined this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>This month's revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$12,450</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Tasks to be completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Orders</TabsTrigger>
              <TabsTrigger value="completed">Completed Orders</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4 space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Pickup Date</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>
                          <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING_PICKUP">Pending Pickup</SelectItem>
                              <SelectItem value="PICKED_UP">Picked Up</SelectItem>
                              <SelectItem value="PROCESSING">Processing</SelectItem>
                              <SelectItem value="READY_FOR_DELIVERY">Ready for Delivery</SelectItem>
                              <SelectItem value="DELIVERED">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>₹{order.totalAmount}</TableCell>
                        <TableCell>{order.pickupDate}</TableCell>
                        <TableCell>{order.deliveryDate || "Pending"}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <p>This is the Completed Orders tab content.</p>
            </TabsContent>
            <TabsContent value="cancelled">
              <p>This is the Cancelled Orders tab content.</p>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

