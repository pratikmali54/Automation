import Sidebar from '@/components/layout/sidebar/sidebar';
import styles from './page.module.css';

export default function EmailTestLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar activeId="workflows" />
      <main className={styles.main}>{children}</main>
    </div>
  );
}