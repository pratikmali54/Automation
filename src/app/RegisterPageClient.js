'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import styles from '../login/page.module.css'; // Reusing login styles

export default function RegisterPageClient() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register.');
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginCard}>
        <header className={styles.cardHeader}>
          <div className={styles.brandBadge}>A</div>
          <h1>Create an Account</h1>
          <p>Kylas Integration & Helper Portal</p>
        </header>

        {error && (
          <div className={styles.errorBanner} role="alert">
            <FiAlertCircle className={styles.errorIcon} />
            <span>{error}</span>
          </div>
        )}

        {success && <div className={styles.successBanner}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <div className={styles.inputWrapper}>
              <FiUser className={styles.fieldIcon} />
              <input id="name" type="text" required disabled={isLoading} placeholder="Arjun Mehta" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email address</label>
            <div className={styles.inputWrapper}>
              <FiMail className={styles.fieldIcon} />
              <input id="email" type="email" required disabled={isLoading} placeholder="admin@.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <FiLock className={styles.fieldIcon} />
              <input id="password" type="password" required disabled={isLoading} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <footer className={styles.cardFooter}>
          <p>Already have an account? <Link href="/login">Sign In</Link></p>
        </footer>
      </div>
    </div>
  );
}