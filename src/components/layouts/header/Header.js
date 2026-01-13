import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  
  // Check if user is logged in (you can replace with actual auth logic)
  const isLoggedIn = localStorage.getItem('user') || false;
  const userRole = localStorage.getItem('userRole') || 'candidate';
  const userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name || 'User' : 'User';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    window.dispatchEvent(new Event('userRoleChanged'));
    window.location.href = '/';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDashboardLink = () => {
    const dashboardLinks = {
      admin: '/dashboard',
      hr: '/dashboard',
      interviewer: '/dashboard',
      candidate: '/dashboard'
    };
    return dashboardLinks[userRole] || '/dashboard';
  };

  const menuItems = [
    { id: 'personal', label: 'Trang cá nhân', icon: '👤', isHot: true, link: '/profile' },
    { id: 'job-requirements', label: 'Cập nhật yêu cầu tìm việc', icon: '👥', link: '#' },
    { id: 'applications', label: 'Quản lý ứng tuyển', icon: '🏢', link: '#' },
    { id: 'vip-services', label: 'Dịch vụ VIP', icon: '💎', link: '#' },
    { id: 'verify', label: 'Xác minh tài khoản', icon: '✉️', link: '#' },
    { id: 'change-password', label: 'Đổi mật khẩu', icon: '🔐', link: '#' },
    { id: 'cv-search', label: 'Đăng tuyển và tìm hồ sơ', icon: '📄', link: '#' },
    { id: 'logout', label: 'Đăng xuất', icon: '🚪', link: '#', isLogout: true }
  ];

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
              <div className={styles.profileDropdown} ref={dropdownRef}>
                <button 
                  className={styles.profileBtn}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className={styles.userText}>{userName}</span>
                  <span className={styles.arrow}>▼</span>
                </button>
                {showDropdown && (
                  <div className={styles.dropdownMenu}>
                    {menuItems.map(item => (
                      <div key={item.id}>
                        {item.isLogout ? (
                          <button 
                            className={`${styles.dropdownItem} ${styles.logout}`}
                            onClick={handleLogout}
                          >
                            <span className={styles.icon}>{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        ) : (
                          <Link 
                            to={item.link}
                            className={styles.dropdownItem}
                            onClick={() => setShowDropdown(false)}
                          >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.itemLabel}>{item.label}</span>
                            {item.isHot && <span className={styles.badge}>🔥Hot</span>}
                          </Link>
                        )}
                      </div>
                    ))}
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
