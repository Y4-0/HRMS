"use client"
import { useState, useEffect } from "react"
import styles from "../dashboard.module.css"

export default function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  
  useEffect(() => {
    fetch('/api/profile').then(res => res.json()).then(data => {
      setProfile(data)
      setFormData(data)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      setProfile(formData)
      setIsEditing(false)
    }
  }

  if (!profile) return <div>Loading Profile...</div>

  return (
    <div>
      <h2>My Profile</h2>
      <div className={styles.card} style={{ maxWidth: '600px', marginTop: '1rem' }}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
              <input 
                value={formData.name || ''} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }} 
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Address</label>
              <input 
                value={formData.address || ''} 
                onChange={e => setFormData({...formData, address: e.target.value})} 
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }} 
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone</label>
              <input 
                value={formData.phone || ''} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }} 
              />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', borderRadius: '4px', cursor: 'pointer', border: 'none' }}>Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '0.5rem 1rem', marginLeft: '1rem', background: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          </form>
        ) : (
          <div>
            <p style={{ marginBottom: '0.5rem' }}><strong>Employee ID:</strong> {profile.employeeId}</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Name:</strong> {profile.name}</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> {profile.email}</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Job Details:</strong> {profile.jobDetails || 'N/A'}</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Address:</strong> {profile.address || 'Not provided'}</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
            <button 
              onClick={() => setIsEditing(true)} 
              style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', marginTop: '1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
