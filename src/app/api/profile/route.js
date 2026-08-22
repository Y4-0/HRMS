import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { employeeId: true, name: true, email: true, jobDetails: true, address: true, phone: true }
  })
  
  return NextResponse.json(user)
}

export async function PUT(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { name, address, phone } = await req.json()

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name, address, phone }
  })

  return NextResponse.json(user)
}
