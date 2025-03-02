"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (searchParams?.get("registered") === "true") {
      setSuccess("Registration successful! Please login.")
    }
    if (searchParams?.get("error")) {
      setError(searchParams.get("error") || "An error occurred")
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      // Successful login - redirect based on role
      const response = await fetch("/api/auth/session")
      const session = await response.json()

      if (session?.user?.role === "ADMIN") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      setError(error.message || "Login failed")
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
              <Image src="/blue-lotus-logo.svg" alt="L2 Dry Cleaners Logo" width={60} height={60} className="mx-auto" />
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-500">Login to your L2 Dry Cleaners account</p>
            </div>
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/register" className="text-sky-600 hover:underline">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-yellow-400 relative">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md space-y-6">
            <h2 className="text-3xl font-bold">Welcome to L2 Dry Cleaners</h2>
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

