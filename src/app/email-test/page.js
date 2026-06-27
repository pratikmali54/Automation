'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function EmailTestPage() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('Test email from Kylas Helper Portal');
  const [message, setMessage] = useState('This is a test email sent from your automation portal.');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, html: `<p>${message}</p>`, text: message }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send email');
      }

      setStatus('Email sent successfully.');
    } catch (error) {
      setStatus(error.message || 'Failed to send email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h1>Gmail SMTP Test</h1>
      <p>Send a test email through your Gmail SMTP configuration.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          To
          <input className={styles.input} type="email" value={to} onChange={(e) => setTo(e.target.value)} required />
        </label>

        <label className={styles.label}>
          Subject
          <input className={styles.input} value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </label>

        <label className={styles.label}>
          Message
          <textarea className={styles.textarea} rows="6" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </label>

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Test Email'}
        </button>
      </form>

      {status ? <div className={styles.status}>{status}</div> : null}
    </div>
  );
}
