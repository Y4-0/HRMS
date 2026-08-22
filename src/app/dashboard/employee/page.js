"use client"
import Link from "next/link"
import styles from "../dashboard.module.css"

export default function EmployeeDashboard() {
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>My Profile</h3>
          <p>View and edit your personal and job details.</p>
          <Link href="/profile" style={{marginTop: '1rem', display: 'inline-block', color: 'var(--primary-color)'}}>Go to Profile &rarr;</Link>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Attendance</h3>
          <p>Check in for the day and view your attendance history.</p>
          <Link href="/attendance" style={{marginTop: '1rem', display: 'inline-block', color: 'var(--primary-color)'}}>View Attendance &rarr;</Link>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Leave Requests</h3>
          <p>Apply for time off and track the status of your requests.</p>
          <Link href="/leave" style={{marginTop: '1rem', display: 'inline-block', color: 'var(--primary-color)'}}>Manage Leaves &rarr;</Link>
        </div>
      </div>
    </div>
  )
}
