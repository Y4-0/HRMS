import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { type, startDate, endDate, remarks } = await req.json()
  const userId = session.user.id

  const newRequest = await prisma.leaveRequest.create({
    data: {
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      remarks,
      userId
    }
  })

  return NextResponse.json(newRequest)
}

export async function PUT(req) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, status, adminComments } = await req.json()

  const updatedRequest = await prisma.leaveRequest.update({
    where: { id },
    data: { status, adminComments }
  })

  return NextResponse.json(updatedRequest)
}
