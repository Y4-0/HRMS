import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import AttendanceClient from "./AttendanceClient"

export default async function AttendancePage() {
  const session = await getServerSession(authOptions)
  
  const history = await prisma.attendance.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' },
    take: 10
  })

  const isAdmin = session.user.role === 'ADMIN'
  let allHistory = []
  
  if (isAdmin) {
    allHistory = await prisma.attendance.findMany({
      include: { user: { select: { name: true, employeeId: true } } },
      orderBy: { date: 'desc' },
      take: 20
    })
  }

  // Check today's attendance for current user
  const startOfDay = new Date()
  startOfDay.setHours(0,0,0,0)
  
  const todayRecord = await prisma.attendance.findFirst({
    where: {
      userId: session.user.id,
      date: { gte: startOfDay }
    }
  })

  return (
    <div>
      <h2>Attendance Tracking</h2>
      <AttendanceClient 
        history={history} 
        allHistory={allHistory} 
        isAdmin={isAdmin} 
        todayRecord={todayRecord} 
      />
    </div>
  )
}
