import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.scss";

export default function AdminLayout() {
  return (
    <div className={styles.adminLayout}>
      <div className={styles.adminTopbar}>
        <div className={styles.brand}>RecruitHub</div>

        <div className={styles.adminMenu}>
          <a className={styles.menuBtn} href="/admin/dashboard">
            Dashboard
          </a>
          <a className={styles.menuBtn} href="/admin/users">
            User Management
          </a>
        </div>

        <button className={styles.logoutBtn}>Logout</button>
      </div>

      <main className={styles.adminContent}>
        <Outlet />
      </main>
    </div>
  );
}
