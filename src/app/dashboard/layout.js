"use client"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import styles from "./dashboard.module.css"
import Clock from "./Clock"

export default function DashboardLayout({ children }) {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/signin" })
  }

  const role = session?.user?.role

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>HRMS Portal</h2>
        </div>
        <nav className={styles.nav}>
          <Link href={`/dashboard/${role === 'ADMIN' ? 'admin' : 'employee'}`} className={styles.navItem}>Dashboard Overview</Link>
          <Link href="/dashboard/profile" className={styles.navItem}>My Profile</Link>
          <Link href="/dashboard/attendance" className={styles.navItem}>Attendance</Link>
          <Link href="/dashboard/leave" className={styles.navItem}>Leave Requests</Link>
          <Link href="/dashboard/payroll" className={styles.navItem}>Payroll</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div>
            <h3>Welcome, {session?.user?.name || 'User'}</h3>
          </div>
          <div className={styles.userInfo}>
            <Clock />
            <span>{role === 'ADMIN' ? 'Admin / HR' : 'Employee'}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </header>
        
        <div className={styles.pageContainer}>
          {children}
        </div>
      </main>
    </div>
  )
}
