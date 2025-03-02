import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Clear the session cookie
  cookies().delete("next-auth.session-token")
  cookies().delete("__Secure-next-auth.session-token")

  return NextResponse.json({ success: true })
}

