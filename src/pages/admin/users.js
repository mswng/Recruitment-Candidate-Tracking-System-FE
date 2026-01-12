import React, { useState } from 'react';
import styles from './users.module.scss';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, fullName: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'candidate', status: 'active' },
    { id: 2, fullName: 'Trần Thị B', email: 'tranthib@example.com', role: 'hr', status: 'active' },
    { id: 3, fullName: 'Lê Văn C', email: 'levanc@example.com', role: 'interviewer', status: 'inactive' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', role: 'candidate' });

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1, status: 'active' }]);
    setNewUser({ fullName: '', email: '', role: 'candidate' });
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Quản lý người dùng</h1>
        <button className={styles.btnAdd} onClick={() => setShowModal(true)}>
          + Thêm người dùng
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <span className={styles.badge}>
                    {user.role === 'candidate' ? 'Ứng viên' : user.role === 'hr' ? 'HR' : 'Interviewer'}
                  </span>
                </td>
                <td>
                  <span className={`${styles.status} ${styles[user.status]}`}>
                    {user.status === 'active' ? 'Kích hoạt' : 'Vô hiệu'}
                  </span>
                </td>
                <td>
                  <button 
                    className={styles.btnSmall}
                    onClick={() => toggleStatus(user.id)}
                  >
                    {user.status === 'active' ? 'Vô hiệu' : 'Kích hoạt'}
                  </button>
                  <button 
                    className={`${styles.btnSmall} ${styles.danger}`}
                    onClick={() => deleteUser(user.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Thêm người dùng mới</h2>
            <form>
              <div className={styles.formGroup}>
                <label>Họ và tên</label>
                <input 
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input 
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Nhập email"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Vai trò</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="candidate">Ứng viên</option>
                  <option value="hr">HR</option>
                  <option value="interviewer">Interviewer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className={styles.actions}>
                <button type="button" className={styles.btnSave} onClick={handleAddUser}>
                  Lưu
                </button>
                <button type="button" className={styles.btnCancel} onClick={() => setShowModal(false)}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
