"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "../dashboard.module.css"

export default function LeaveClient({ leaveRequests, isAdmin }) {
  const [formData, setFormData] = useState({ type: 'Paid', startDate: '', endDate: '', remarks: '' })
  const [isApplying, setIsApplying] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleApply = async (e) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setLoading(false)
    setIsApplying(false)
    setFormData({ type: 'Paid', startDate: '', endDate: '', remarks: '' })
    router.refresh()
  }

  const handleAction = async (id, status) => {
    await fetch('/api/leave', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, adminComments: `Automatically ${status.toLowerCase()} by Admin` })
    })
    router.refresh()
  }

  return (
    <div>
      {!isAdmin && (
        <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
          <button onClick={() => setIsApplying(!isApplying)} style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white' }}>
            {isApplying ? 'Cancel Application' : 'Apply for Leave'}
          </button>
          
          {isApplying && (
            <div className={styles.card} style={{ marginTop: '1rem', maxWidth: '500px' }}>
              <form onSubmit={handleApply}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block' }}>Leave Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '0.5rem' }}>
                    <option value="Paid">Paid</option>
                    <option value="Sick">Sick</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block' }}>Start Date</label>
                  <input type="date" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block' }}>End Date</label>
                  <input type="date" required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block' }}>Remarks</label>
                  <textarea value={formData.remarks} onChange={e => setFormData({...formData, remarks: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} rows={3} />
                </div>
                <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white' }}>Submit Request</button>
              </form>
            </div>
          )}
        </div>
      )}

      <div className={styles.card} style={{ marginTop: '1rem' }}>
        <h3>{isAdmin ? "All Leave Requests" : "My Leave History"}</h3>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              {isAdmin && <th style={{ padding: '0.5rem' }}>Employee</th>}
              <th style={{ padding: '0.5rem' }}>Type</th>
              <th style={{ padding: '0.5rem' }}>Duration</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
              <th style={{ padding: '0.5rem' }}>Remarks</th>
              {isAdmin && <th style={{ padding: '0.5rem' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(req => (
              <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                {isAdmin && <td style={{ padding: '0.5rem' }}>{req.user?.name}</td>}
                <td style={{ padding: '0.5rem' }}>{req.type}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(req.startDate).toLocaleDateString()} to {new Date(req.endDate).toLocaleDateString()}</td>
                <td style={{ padding: '0.5rem', fontWeight: 'bold', color: req.status === 'Approved' ? 'green' : req.status === 'Rejected' ? 'red' : 'orange' }}>{req.status}</td>
                <td style={{ padding: '0.5rem' }}>{req.remarks || '-'}</td>
                {isAdmin && (
                  <td style={{ padding: '0.5rem' }}>
                    {req.status === 'Pending' ? (
                      <>
                        <button onClick={() => handleAction(req.id, 'Approved')} style={{ marginRight: '0.5rem', background: 'green', color: 'white', padding: '0.25rem 0.5rem', border: 'none', borderRadius: '4px' }}>Approve</button>
                        <button onClick={() => handleAction(req.id, 'Rejected')} style={{ background: 'red', color: 'white', padding: '0.25rem 0.5rem', border: 'none', borderRadius: '4px' }}>Reject</button>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {leaveRequests.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 6 : 4} style={{ padding: '1rem', textAlign: 'center' }}>No leave requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
