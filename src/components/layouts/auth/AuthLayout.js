import styles from "./Auth.module.scss";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>{children}</div>
    </div>
  );
}
