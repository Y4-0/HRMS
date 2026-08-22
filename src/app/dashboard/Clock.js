"use client"
import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';

export default function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <div className={styles.clock}>--:--:--</div>;

  return <div className={styles.clock}>{time}</div>;
}
