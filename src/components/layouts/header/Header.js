import { Link, useLocation } from "react-router-dom";
import { MENU } from "../../../config/menuConfig";
import styles from "./Header.module.scss";

export default function Header() {
  const role = localStorage.getItem("role") || "guest";
  const location = useLocation();

  const menus = MENU[role] || [];

  const isActive = (path) => {
    const current = location.pathname;

    if (path === "/") {
      return current === "/";
    }

    return current === path || current.startsWith(path + "/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>RecruitHub</div>

      <nav className={styles.center}>
        {menus.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            className={`${styles.menuItem} ${
              isActive(item.path) ? styles.active : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.right}>
        {role === "guest" ? (
          <>
            <Link to="/login" className={styles.login}>
              Đăng nhập
            </Link>
            <Link to="/register" className={styles.register}>
              Đăng ký
            </Link>
          </>
        ) : (
          <button
            className={styles.logout}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
