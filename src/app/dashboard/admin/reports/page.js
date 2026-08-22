import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ReportsClient from "./ReportsClient"

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const users = await prisma.user.findMany({ select: { name: true, email: true, employeeId: true, jobTitle: true, department: true } })
  const attendances = await prisma.attendance.findMany({ include: { user: { select: { name: true } } } })
  const leaves = await prisma.leaveRequest.findMany({ include: { user: { select: { name: true } } } })
  const payrolls = await prisma.payroll.findMany({ include: { user: { select: { name: true } } } })

  return (
    <div>
      <h2 style={{ marginBottom: '1rem', color: 'var(--primary-color)', textShadow: 'var(--primary-glow)' }}>Analytics & Reporting</h2>
      <ReportsClient users={users} attendances={attendances} leaves={leaves} payrolls={payrolls} />
    </div>
  )
}
