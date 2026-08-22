"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "../dashboard.module.css"

export default function AttendanceClient({ history, allHistory, isAdmin, todayRecord }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckIn = async () => {
    setLoading(true)
    await fetch('/api/attendance', {
      method: 'POST',
      body: JSON.stringify({ action: 'checkIn' })
    })
    setLoading(false)
    router.refresh()
  }

  const handleCheckOut = async () => {
    setLoading(true)
    await fetch('/api/attendance', {
      method: 'POST',
      body: JSON.stringify({ action: 'checkOut' })
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <div>
      <div className={styles.card} style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <h3>Today's Attendance</h3>
        <p style={{ margin: '1rem 0' }}>
          Status: <strong>{todayRecord ? todayRecord.status : 'Not Checked In'}</strong>
        </p>
        
        {!todayRecord && (
          <button onClick={handleCheckIn} disabled={loading} style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white' }}>
            Check In
          </button>
        )}
        
        {todayRecord && !todayRecord.checkOut && (
          <div>
            <p>Checked In at: {new Date(todayRecord.checkIn).toLocaleTimeString()}</p>
            <button onClick={handleCheckOut} disabled={loading} style={{ padding: '0.5rem 1rem', background: 'var(--danger-color)', color: 'white', marginTop: '1rem' }}>
              Check Out
            </button>
          </div>
        )}
        
        {todayRecord && todayRecord.checkOut && (
          <p>Checked Out at: {new Date(todayRecord.checkOut).toLocaleTimeString()}</p>
        )}
      </div>

      <div className={styles.card}>
        <h3>{isAdmin ? "All Employees Attendance (Recent)" : "My Recent Attendance"}</h3>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              {isAdmin && <th style={{ padding: '0.5rem' }}>Employee</th>}
              <th style={{ padding: '0.5rem' }}>Date</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
              <th style={{ padding: '0.5rem' }}>Check In</th>
              <th style={{ padding: '0.5rem' }}>Check Out</th>
            </tr>
          </thead>
          <tbody>
            {(isAdmin ? allHistory : history).map(record => (
              <tr key={record.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                {isAdmin && <td style={{ padding: '0.5rem' }}>{record.user.name} ({record.user.employeeId})</td>}
                <td style={{ padding: '0.5rem' }}>{new Date(record.date).toLocaleDateString()}</td>
                <td style={{ padding: '0.5rem' }}>{record.status}</td>
                <td style={{ padding: '0.5rem' }}>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '-'}</td>
                <td style={{ padding: '0.5rem' }}>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '-'}</td>
              </tr>
            ))}
            {(isAdmin ? allHistory : history).length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} style={{ padding: '1rem', textAlign: 'center' }}>No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
