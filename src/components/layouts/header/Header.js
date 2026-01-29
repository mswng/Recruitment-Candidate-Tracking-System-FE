import { Link, useLocation, useNavigate } from "react-router-dom";
import { MENU } from "../../../config/menuConfig";
import styles from "./Header.module.scss";
import { logout } from "../../../api/server/logoutAPI";

export default function Header() {
  const role = localStorage.getItem("role") || "guest";
  const location = useLocation();
  const navigate = useNavigate();

  const menus = MENU[role] || [];

  const isActive = (path) => {
    const current = location.pathname;
    if (path === "/") return current === "/";
    return current === path || current.startsWith(path + "/");
  };

  const handleLogout = async () => {
    try {
      await logout(); // ✅ gọi API backend
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      ["token", "role", "userType", "user"].forEach((key) =>
        localStorage.removeItem(key)
      );

      navigate("/login", { replace: true }); // ✅ điều hướng đúng React
    }
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
          <button className={styles.logout} onClick={handleLogout}>
            Đăng xuất
          </button>
        )}
      </div>
    </header>
  );
}
