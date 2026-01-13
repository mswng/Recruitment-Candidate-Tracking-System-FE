import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { label: 'Quản lý người dùng', icon: '👥', path: '/admin/users' },
    { label: 'Pipeline', icon: '📈', path: '/admin/pipeline' },
    { label: 'Phỏng vấn', icon: '💼', path: '/admin/interviews' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path}
                className={`${styles.menuItem} ${isActive(item.path) ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
