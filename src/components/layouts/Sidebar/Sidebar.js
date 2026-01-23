import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const location = useLocation();
  const role = localStorage.getItem("role") || "ADMIN";

  const menuByRole = {
    ADMIN: [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Quản lý người dùng", path: "/admin/users" },
      { label: "Pipeline", path: "/admin/pipeline" },
      { label: "Phỏng vấn", path: "/admin/interviews" },
    ],
  };

  const menuItems = menuByRole[role] || [];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`${styles.menuItem} ${
                isActive(item.path) ? styles.active : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
