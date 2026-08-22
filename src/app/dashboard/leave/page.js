import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import LeaveClient from "./LeaveClient"

export default async function LeavePage() {
  const session = await getServerSession(authOptions)
  const isAdmin = session.user.role === 'ADMIN'
  
  let leaveRequests = []

  if (isAdmin) {
    leaveRequests = await prisma.leaveRequest.findMany({
      include: { user: { select: { name: true, employeeId: true } } },
      orderBy: { createdAt: 'desc' }
    })
  } else {
    leaveRequests = await prisma.leaveRequest.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    })
  }

  return (
    <div>
      <h2>Leave Management</h2>
      <LeaveClient leaveRequests={leaveRequests} isAdmin={isAdmin} />
    </div>
  )
}
