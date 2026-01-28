import { useLocation } from "react-router-dom";
import styles from "./Auth.module.scss";

export default function AuthLayout({ children }) {
  const { pathname } = useLocation();

  // Nếu không phải trang auth → không bọc
  if (!["/login", "/register", "/forgot-password"].includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>{children}</div>
    </div>
  );
}
