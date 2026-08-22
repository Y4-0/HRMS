"use client"
import Link from "next/link"
import styles from "../dashboard.module.css"

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p style={{marginTop: '0.5rem', color: 'var(--foreground)'}}>Overview of HR metrics and pending actions.</p>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Total Employees</h3>
          <p className={styles.cardValue}>12</p>
          <Link href="/profile" style={{marginTop: '1rem', display: 'inline-block', color: 'var(--primary-color)'}}>Manage Employees &rarr;</Link>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Pending Leaves</h3>
          <p className={styles.cardValue}>3</p>
          <Link href="/leave" style={{marginTop: '1rem', display: 'inline-block', color: 'var(--primary-color)'}}>Review Requests &rarr;</Link>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Today's Attendance</h3>
          <p className={styles.cardValue}>10 / 12</p>
          <Link href="/attendance" style={{marginTop: '1rem', display: 'inline-block', color: 'var(--primary-color)'}}>View Attendance &rarr;</Link>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Payroll Pending</h3>
          <p className={styles.cardValue}>2</p>
          <Link href="/payroll" style={{marginTop: '1rem', display: 'inline-block', color: 'var(--primary-color)'}}>Manage Payroll &rarr;</Link>
        </div>
      </div>
    </div>
  )
}
