"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [otpLogin, setOtpLogin] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (searchParams?.get("registered") === "true") {
      setSuccess("Registration successful! Please login.")
    }
  }, [searchParams])

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (otpLogin) {
        if (!otp || otp.length !== 6) {
          setError("Please enter a valid OTP")
          setLoading(false)
          return
        }

        // In a real app, you would verify the OTP with your SMS service
        // For demo purposes, we'll simulate verification and login

        // This would be replaced with actual OTP verification
        const { data, error } = await supabase.auth.signInWithPassword({
          phone: phoneNumber,
          password: otp, // In a real OTP flow, this would be different
        })

        if (error) throw error
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: phoneNumber, // This could be email or phone based on your setup
          password,
        })

        if (error) throw error
      }

      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Login failed")
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
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-500">Login to your L1 Dry Cleaners account</p>
            </div>
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}
            {!otpLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Email or Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="john@example.com or +1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-sky-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
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
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-sky-600 hover:underline"
                    onClick={() => setOtpLogin(true)}
                  >
                    Login with OTP instead
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-sky-600 hover:underline">
                    Register
                  </Link>
                </p>
              </form>
            ) : (
              <>
                {!otpSent ? (
                  <form onSubmit={handleSendOTP} className="space-y-4">
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
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                      disabled={loading}
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm text-sky-600 hover:underline"
                        onClick={() => setOtpLogin(false)}
                      >
                        Login with password instead
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP sent to {phoneNumber}</Label>
                      <Input
                        id="otp"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login with OTP"}
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={() => setOtpSent(false)}>
                      Back
                    </Button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-yellow-400 relative">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md space-y-6">
            <h2 className="text-3xl font-bold">Welcome to L1 Dry Cleaners</h2>
            <p className="text-gray-800">
              Login to track your orders, schedule pickups, and manage your dry cleaning needs.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-yellow-300/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Track Your Orders</h3>
                <p className="text-sm">Monitor the status of your clothes in real-time</p>
              </div>
              <div className="bg-yellow-300/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Schedule Pickups</h3>
                <p className="text-sm">Book convenient pickup times that fit your schedule</p>
              </div>
              <div className="bg-yellow-300/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Rate Our Service</h3>
                <p className="text-sm">Share your feedback and help us improve</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

