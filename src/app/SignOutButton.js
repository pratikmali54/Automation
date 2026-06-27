'use client';

import { signOut } from 'next-auth/react';
import styles from './profile.module.css';

export function SignOutButton() {
  return (
    <button className={styles.button} onClick={() => signOut({ callbackUrl: '/login' })}>
      Sign Out
    </button>
  );
}