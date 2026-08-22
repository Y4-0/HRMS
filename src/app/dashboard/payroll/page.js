import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import PayrollClient from "./PayrollClient"

export default async function PayrollPage() {
  const session = await getServerSession(authOptions)
  const isAdmin = session.user.role === 'ADMIN'
  
  let payrollRecords = []
  let employees = []

  if (isAdmin) {
    payrollRecords = await prisma.payroll.findMany({
      include: { user: { select: { name: true, employeeId: true } } },
      orderBy: [{ year: 'desc' }, { month: 'desc' }]
    })
    
    employees = await prisma.user.findMany({
      select: { id: true, name: true, employeeId: true }
    })
  } else {
    payrollRecords = await prisma.payroll.findMany({
      where: { userId: session.user.id },
      orderBy: [{ year: 'desc' }, { month: 'desc' }]
    })
  }

  return (
    <div>
      <h2>Payroll & Salary Management</h2>
      <PayrollClient payrollRecords={payrollRecords} isAdmin={isAdmin} employees={employees} />
    </div>
  )
}
