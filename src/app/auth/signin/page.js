"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "../auth.module.css"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError("Invalid email or password")
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Sign In to HRMS</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              className={styles.input} 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Sign In</button>
        </form>
        <p className={styles.linkText}>
          Don't have an account? <Link href="/auth/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
