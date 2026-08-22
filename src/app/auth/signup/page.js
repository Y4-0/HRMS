"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "../auth.module.css"

export default function SignUp() {
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE"
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || "Something went wrong")
    } else {
      setSuccess("Account created! Please sign in.")
      setTimeout(() => {
        router.push("/auth/signin")
      }, 2000)
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Register for HRMS</h1>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div style={{color: 'green', marginBottom: '1rem', textAlign: 'center'}}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="employeeId">Employee ID</label>
            <input 
              id="employeeId"
              type="text" 
              className={styles.input} 
              value={formData.employeeId}
              onChange={e => setFormData({...formData, employeeId: e.target.value})}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Full Name</label>
            <input 
              id="name"
              type="text" 
              className={styles.input} 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              className={styles.input} 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              className={styles.input}
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
              minLength={6}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="role">Role</label>
            <select 
              id="role"
              className={styles.input}
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin / HR</option>
            </select>
          </div>

          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
        <p className={styles.linkText}>
          Already have an account? <Link href="/auth/signin">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
