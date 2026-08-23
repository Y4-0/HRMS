"use client"
import styles from "../../dashboard.module.css"

export default function ReportsClient({ users, attendances, leaves, payrolls }) {
  const downloadCSV = (data, filename) => {
    if (data.length === 0) return alert("No data to export")
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName] || '')).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  const exportEmployees = () => downloadCSV(users, "employees.csv")
  const exportAttendance = () => downloadCSV(attendances.map(a => ({ Employee: a.user.name, Date: new Date(a.date).toLocaleDateString(), Status: a.status, CheckIn: a.checkInTime, CheckOut: a.checkOutTime })), "attendance.csv")
  const exportLeaves = () => downloadCSV(leaves.map(l => ({ Employee: l.user.name, Type: l.type, StartDate: new Date(l.startDate).toLocaleDateString(), EndDate: new Date(l.endDate).toLocaleDateString(), Status: l.status })), "leaves.csv")
  const exportPayroll = () => downloadCSV(payrolls.map(p => ({ Employee: p.user.name, Period: `${p.month}/${p.year}`, BaseSalary: p.baseSalary, Deductions: p.deductions, NetSalary: p.netSalary, Status: p.status })), "payroll.csv")

  return (
    <div className={styles.cardGrid}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Employee Report</h3>
        <p className={styles.cardValue} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Total: {users.length}</p>
        <button onClick={exportEmployees}>Download CSV</button>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Attendance Report</h3>
        <p className={styles.cardValue} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Records: {attendances.length}</p>
        <button onClick={exportAttendance}>Download CSV</button>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Leaves Report</h3>
        <p className={styles.cardValue} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Requests: {leaves.length}</p>
        <button onClick={exportLeaves}>Download CSV</button>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Payroll Report</h3>
        <p className={styles.cardValue} style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Records: {payrolls.length}</p>
        <button onClick={exportPayroll}>Download CSV</button>
      </div>
    </div>
  )
}
