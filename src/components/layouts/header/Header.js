import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  
  // Check if user is logged in (you can replace with actual auth logic)
  const isLoggedIn = localStorage.getItem('user') || false;
  const userRole = localStorage.getItem('userRole') || 'candidate';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    const dashboardLinks = {
      admin: '/dashboard',
      hr: '/dashboard',
      interviewer: '/dashboard',
      candidate: '/dashboard'
    };
    return dashboardLinks[userRole] || '/dashboard';
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
            <li><Link to="/jobs">Việc làm</Link></li>
            <li><Link to="/companies">Công ty</Link></li>
          </ul>
        </nav>

        <div className={styles.actions}>
          {isLoggedIn ? (
            <>
              <Link to={getDashboardLink()} className={styles.btnDashboard}>
                Dashboard
              </Link>
              <div className={styles.profileDropdown}>
                <button 
                  className={styles.profileBtn}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  👤 {userRole}
                  <span className={styles.arrow}>▼</span>
                </button>
                {showDropdown && (
                  <div className={styles.dropdownMenu}>
                    <Link to="/profile" className={styles.dropdownItem}>
                      Hồ sơ cá nhân
                    </Link>
                    <button 
                      className={styles.dropdownItem}
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.btnLogin}>Đăng nhập</Link>
              <Link to="/register" className={styles.btnRegister}>Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
