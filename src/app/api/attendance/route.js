import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { action } = await req.json()
  const userId = session.user.id
  
  const startOfDay = new Date()
  startOfDay.setHours(0,0,0,0)

  let todayRecord = await prisma.attendance.findFirst({
    where: {
      userId,
      date: { gte: startOfDay }
    }
  })

  if (action === 'checkIn') {
    if (todayRecord) {
      return NextResponse.json({ error: "Already checked in today" }, { status: 400 })
    }

    const newRecord = await prisma.attendance.create({
      data: {
        userId,
        date: new Date(),
        status: "Present",
        checkIn: new Date()
      }
    })
    return NextResponse.json(newRecord)
  }

  if (action === 'checkOut') {
    if (!todayRecord || todayRecord.checkOut) {
      return NextResponse.json({ error: "Cannot check out" }, { status: 400 })
    }

    const updatedRecord = await prisma.attendance.update({
      where: { id: todayRecord.id },
      data: { checkOut: new Date() }
    })
    return NextResponse.json(updatedRecord)
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
