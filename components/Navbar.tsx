"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // In a real app, this would check the user's session
  useEffect(() => {
    // Mock authentication check
    setIsLoggedIn(false)
    setIsAdmin(false)
  }, [])

  const isActive = (path: string) => {
    return pathname === path ? "text-sky-600" : "text-gray-600 hover:text-sky-600"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/flower-logo.svg" alt="L2 Dry Cleaners Logo" width={40} height={40} />
          <span className="text-xl font-bold text-sky-600">L2 Dry Cleaners</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className={`text-sm font-medium ${isActive("/")}`}>
            Home
          </Link>
          <Link href="/services" className={`text-sm font-medium ${isActive("/services")}`}>
            Services
          </Link>
          <Link href="/how-it-works" className={`text-sm font-medium ${isActive("/how-it-works")}`}>
            How It Works
          </Link>
          <Link href="/pricing" className={`text-sm font-medium ${isActive("/pricing")}`}>
            Pricing
          </Link>
          <Link href="/contact" className={`text-sm font-medium ${isActive("/contact")}`}>
            Contact
          </Link>
          <Link href="/track-order" className={`text-sm font-medium ${isActive("/track-order")}`}>
            Track Order
          </Link>
          {isAdmin && (
            <Link href="/admin" className={`text-sm font-medium ${isActive("/admin")}`}>
              Admin Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="hidden md:flex">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
} 