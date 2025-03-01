"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function Register() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number")
      setLoading(false)
      return
    }

    // In a real app, you would integrate with an SMS service
    // For demo purposes, we'll simulate OTP sent
    setTimeout(() => {
      setOtpSent(true)
      setLoading(false)
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid OTP")
      setLoading(false)
      return
    }

    try {
      // In a real app, you would verify the OTP with your SMS service
      // For demo purposes, we'll simulate verification and create the user

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone: phoneNumber,
        options: {
          data: {
            full_name: fullName,
            address,
          },
        },
      })

      if (error) throw error

      // Register in your custom users table
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: data.user?.id,
          full_name: fullName,
          email,
          phone: phoneNumber,
          address,
        },
      ])

      if (profileError) throw profileError

      router.push("/login?registered=true")
    } catch (error: any) {
      setError(error.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-sky-50">
      <div className="flex flex-col w-full lg:w-1/2 p-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <Image src="/logo.svg" alt="L1 Dry Cleaners Logo" width={60} height={60} className="mx-auto" />
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-gray-500">Enter your details to register with L1 Dry Cleaners</p>
            </div>
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link href="/login" className="text-sky-600 hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP sent to {phoneNumber}</Label>
                  <Input id="otp" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Complete Registration"}
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => setOtpSent(false)}>
                  Back
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-sky-600 relative">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md space-y-6 text-white">
            <h2 className="text-3xl font-bold">Experience Premium Dry Cleaning</h2>
            <p className="text-sky-100">
              Join L1 Dry Cleaners for doorstep pickup and delivery, quality cleaning, and exceptional service.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-sky-500/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Convenient</h3>
                <p className="text-sm text-sky-100">Doorstep pickup and delivery at your schedule</p>
              </div>
              <div className="bg-sky-500/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-sm text-sky-100">Premium cleaning with attention to detail</p>
              </div>
              <div className="bg-sky-500/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Affordable</h3>
                <p className="text-sm text-sky-100">Competitive pricing with no hidden charges</p>
              </div>
              <div className="bg-sky-500/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Reliable</h3>
                <p className="text-sm text-sky-100">On-time service with real-time tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

