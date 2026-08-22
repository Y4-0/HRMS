import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { userId, month, year, baseSalary, deductions } = await req.json()
  const netSalary = baseSalary - (deductions || 0)

  try {
    const newPayroll = await prisma.payroll.create({
      data: {
        userId,
        month,
        year,
        baseSalary,
        deductions: deductions || 0,
        netSalary,
        status: "Pending"
      }
    })
    return NextResponse.json(newPayroll)
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Payroll for this month already exists" }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, status } = await req.json()

  const updatedPayroll = await prisma.payroll.update({
    where: { id },
    data: { status }
  })

  return NextResponse.json(updatedPayroll)
}
