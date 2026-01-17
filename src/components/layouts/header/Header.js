import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem('token');
      const role = token ? localStorage.getItem('userRole') : null;
      const user = token ? localStorage.getItem('user') : null;

      setUserRole(role);
      setUserName(user ? JSON.parse(user).name || 'User' : null);
    };

    syncAuth();
    window.addEventListener('userRoleChanged', syncAuth);
    return () => window.removeEventListener('userRoleChanged', syncAuth);
  }, []);

  const isLoggedIn = !!userRole;

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('userRoleChanged'));
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>RecruitHub</h1>
        </Link>

        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            <li><Link to="/">Trang chủ</Link></li>
          </ul>
        </nav>

        <div className={styles.actions}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className={styles.btnLogin}>Đăng nhập</Link>
              <Link to="/register" className={styles.btnRegister}>Đăng ký</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={styles.btnDashboard}>Dashboard</Link>

              <div className={styles.profileDropdown} ref={dropdownRef}>
                <button
                  className={styles.profileBtn}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {userName} ▼
                </button>

                {showDropdown && (
                  <div className={styles.dropdownMenu}>
                    <button className={styles.dropdownItem} onClick={handleLogout}>
                      🚪 Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
