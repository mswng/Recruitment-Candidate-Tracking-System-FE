import { Link, useLocation } from "react-router-dom";
import { MENU } from "../../../config/menuConfig";
import styles from "./Header.module.scss";

export default function Header() {
  const role = localStorage.getItem("role") || "guest";
  const location = useLocation();

  const menus = MENU[role] || [];

  return (
    <header className={styles.header}>
      {/* LEFT */}
      <div className={styles.left}>RecruitHub</div>

      {/* CENTER */}
      <nav className={styles.center}>
        {menus.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            className={`${styles.menuItem} ${
              location.pathname === item.path ? styles.active : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* RIGHT */}
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
