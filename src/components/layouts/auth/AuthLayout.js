import Header from "../header/Header";
import styles from "./Auth.module.scss";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.authPage}>
      <Header />
      <div className={styles.authContainer}>
        {children}
      </div>
    </div>
  );
}
