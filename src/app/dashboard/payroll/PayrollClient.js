"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "../dashboard.module.css"

export default function PayrollClient({ payrollRecords, isAdmin, employees }) {
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({ userId: '', month: new Date().getMonth() + 1, year: new Date().getFullYear(), baseSalary: '', deductions: 0 })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/payroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setLoading(false)
    setIsCreating(false)
    router.refresh()
  }

  const handleStatusChange = async (id, status) => {
    await fetch('/api/payroll', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    router.refresh()
  }

  return (
    <div>
      {isAdmin && (
        <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
          <button onClick={() => setIsCreating(!isCreating)} style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white' }}>
            {isCreating ? 'Cancel' : 'Generate Payroll'}
          </button>
          
          {isCreating && (
            <div className={styles.card} style={{ marginTop: '1rem', maxWidth: '500px' }}>
              <form onSubmit={handleCreate}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block' }}>Employee</label>
                  <select required value={formData.userId} onChange={e => setFormData({...formData, userId: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                    <option value="">Select Employee</option>
                    {employees?.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.employeeId})</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block' }}>Month (1-12)</label>
                    <input type="number" min="1" max="12" required value={formData.month} onChange={e => setFormData({...formData, month: parseInt(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block' }}>Year</label>
                    <input type="number" required value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block' }}>Base Salary</label>
                  <input type="number" required value={formData.baseSalary} onChange={e => setFormData({...formData, baseSalary: parseFloat(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block' }}>Deductions</label>
                  <input type="number" value={formData.deductions} onChange={e => setFormData({...formData, deductions: parseFloat(e.target.value)})} style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white' }}>Generate</button>
              </form>
            </div>
          )}
        </div>
      )}

      <div className={styles.card} style={{ marginTop: '1rem' }}>
        <h3>{isAdmin ? "All Payroll Records" : "My Salary Slips"}</h3>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              {isAdmin && <th style={{ padding: '0.5rem' }}>Employee</th>}
              <th style={{ padding: '0.5rem' }}>Period</th>
              <th style={{ padding: '0.5rem' }}>Base Salary</th>
              <th style={{ padding: '0.5rem' }}>Deductions</th>
              <th style={{ padding: '0.5rem' }}>Net Pay</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
              {isAdmin && <th style={{ padding: '0.5rem' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {payrollRecords.map(record => (
              <tr key={record.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                {isAdmin && <td style={{ padding: '0.5rem' }}>{record.user?.name}</td>}
                <td style={{ padding: '0.5rem' }}>{record.month}/{record.year}</td>
                <td style={{ padding: '0.5rem' }}>${record.baseSalary.toFixed(2)}</td>
                <td style={{ padding: '0.5rem' }}>${record.deductions.toFixed(2)}</td>
                <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>${record.netSalary.toFixed(2)}</td>
                <td style={{ padding: '0.5rem', color: record.status === 'Paid' ? 'green' : 'orange' }}>{record.status}</td>
                {isAdmin && (
                  <td style={{ padding: '0.5rem' }}>
                    {record.status === 'Pending' && (
                      <button onClick={() => handleStatusChange(record.id, 'Paid')} style={{ background: 'green', color: 'white', padding: '0.25rem 0.5rem', border: 'none', borderRadius: '4px' }}>Mark Paid</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {payrollRecords.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 7 : 5} style={{ padding: '1rem', textAlign: 'center' }}>No payroll records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
