"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeft, Home, Package, Clock, User, Settings, LogOut, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SchedulePickup() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState("")
  const [address, setAddress] = useState("")
  const [useDefaultAddress, setUseDefaultAddress] = useState(true)
  const [instructions, setInstructions] = useState("")
  const [services, setServices] = useState<string[]>([])
  const [step, setStep] = useState(1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" })
    router.push("/login")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // In a real app, you would submit to your database
    // For demo purposes, we'll simulate a submission

    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard?orderPlaced=true")
    }, 1500)
  }

  const handleServiceToggle = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service))
    } else {
      setServices([...services, service])
    }
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
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
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
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-sky-50 text-sky-600"
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
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
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
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-sky-50 text-sky-600"
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
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <h1 className="text-xl font-semibold">Schedule Pickup</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {step === 1 ? "Select Services" : step === 2 ? "Schedule Pickup" : "Review & Confirm"}
                </h2>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-sky-600" : "bg-gray-300"}`}></div>
                  <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-sky-600" : "bg-gray-300"}`}></div>
                  <div className={`w-3 h-3 rounded-full ${step >= 3 ? "bg-sky-600" : "bg-gray-300"}`}></div>
                </div>
              </div>
            </div>

            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Services</CardTitle>
                  <CardDescription>Choose the services you need</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "dry-cleaning", name: "Dry Cleaning", description: "For delicate fabrics and formal wear" },
                      { id: "wash-fold", name: "Wash & Fold", description: "Regular laundry service" },
                      { id: "ironing", name: "Ironing", description: "Professional pressing service" },
                      {
                        id: "stain-removal",
                        name: "Stain Removal",
                        description: "Specialized treatment for tough stains",
                      },
                      { id: "alterations", name: "Alterations", description: "Basic repairs and alterations" },
                      { id: "express", name: "Express Service", description: "Same day or next day service" },
                    ].map((service) => (
                      <div
                        key={service.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          services.includes(service.id)
                            ? "border-sky-600 bg-sky-50"
                            : "border-gray-200 hover:border-sky-200"
                        }`}
                        onClick={() => handleServiceToggle(service.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={service.id}
                            checked={services.includes(service.id)}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                          />
                          <div>
                            <Label htmlFor={service.id} className="font-medium cursor-pointer">
                              {service.name}
                            </Label>
                            <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black"
                    onClick={() => setStep(2)}
                    disabled={services.length === 0}
                  >
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Pickup</CardTitle>
                  <CardDescription>Choose when and where to pick up your clothes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Pickup Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            return date < today
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Pickup Time Slot</Label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9-11">9:00 AM - 11:00 AM</SelectItem>
                        <SelectItem value="11-1">11:00 AM - 1:00 PM</SelectItem>
                        <SelectItem value="1-3">1:00 PM - 3:00 PM</SelectItem>
                        <SelectItem value="3-5">3:00 PM - 5:00 PM</SelectItem>
                        <SelectItem value="5-7">5:00 PM - 7:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="default-address"
                        checked={useDefaultAddress}
                        onCheckedChange={(checked) => setUseDefaultAddress(checked as boolean)}
                      />
                      <Label htmlFor="default-address">Use my default address</Label>
                    </div>
                  </div>

                  {!useDefaultAddress && (
                    <div className="space-y-2">
                      <Label htmlFor="address">Pickup Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your full address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special instructions for pickup"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black"
                    onClick={() => setStep(3)}
                    disabled={!date || !timeSlot}
                  >
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review & Confirm</CardTitle>
                  <CardDescription>Review your order details before confirming</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Selected Services</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((service) => (
                        <div key={service} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-sky-600"></div>
                          <span className="text-sm">
                            {service === "dry-cleaning"
                              ? "Dry Cleaning"
                              : service === "wash-fold"
                                ? "Wash & Fold"
                                : service === "ironing"
                                  ? "Ironing"
                                  : service === "stain-removal"
                                    ? "Stain Removal"
                                    : service === "alterations"
                                      ? "Alterations"
                                      : "Express Service"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Pickup Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-sm">{date ? format(date, "PPP") : "Not selected"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Time Slot</p>
                        <p className="text-sm">
                          {timeSlot === "9-11"
                            ? "9:00 AM - 11:00 AM"
                            : timeSlot === "11-1"
                              ? "11:00 AM - 1:00 PM"
                              : timeSlot === "1-3"
                                ? "1:00 PM - 3:00 PM"
                                : timeSlot === "3-5"
                                  ? "3:00 PM - 5:00 PM"
                                  : timeSlot === "5-7"
                                    ? "5:00 PM - 7:00 PM"
                                    : "Not selected"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm">
                      {useDefaultAddress ? "123 Main St, Apt 4B, New York, NY 10001" : address || "No address provided"}
                    </p>
                  </div>

                  {instructions && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Special Instructions</h3>
                      <p className="text-sm">{instructions}</p>
                    </div>
                  )}

                  <div className="space-y-2 pt-4 border-t">
                    <h3 className="font-medium">Payment Method</h3>
                    <RadioGroup defaultValue="upi">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi">UPI Payment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod">Cash on Delivery</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm Order"}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

