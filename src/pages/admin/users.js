import React, { useState } from "react";
import styles from "./users.module.scss";

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, fullName: "Nguyễn Văn A", email: "a@gmail.com", role: "Ứng viên", status: "active" },
    { id: 2, fullName: "Trần Thị B", email: "b@gmail.com", role: "HR", status: "active" },
    { id: 3, fullName: "Lê Văn C", email: "c@gmail.com", role: "Phỏng vấn", status: "inactive" },
    { id: 4, fullName: "Phạm Đức D", email: "d@gmail.com", role: "Ứng viên", status: "active" },
    { id: 5, fullName: "Hoàng Anh E", email: "e@gmail.com", role: "Ứng viên", status: "active" },
    { id: 6, fullName: "Vũ Minh F", email: "f@gmail.com", role: "HR", status: "inactive" },
    { id: 7, fullName: "Ngô Thanh G", email: "g@gmail.com", role: "Phỏng vấn", status: "active" },
    { id: 8, fullName: "Đặng Thu H", email: "h@gmail.com", role: "Ứng viên", status: "active" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    fullName: "",
    email: "",
    role: "Ứng viên",
    status: "active",
  });

  // bật / tắt trạng thái
  const toggleStatus = (id) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
    ));
  };

  // mở form thêm
  const handleAddUser = () => {
    setIsEdit(false);
    setCurrentUser({
      id: null,
      fullName: "",
      email: "",
      role: "Ứng viên",
      status: "active",
    });
    setShowForm(true);
  };

  // mở form sửa
  const handleUpdateUser = (id) => {
    const user = users.find(u => u.id === id);
    setIsEdit(true);
    setCurrentUser(user);
    setShowForm(true);
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
    } else {
      setUsers([...users, { ...currentUser, id: Date.now() }]);
    }

    setShowForm(false);
  };

  return (
    <div className={styles.userScope}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1></h1>
          <button onClick={handleAddUser} className={styles.btnAdd}>
            + Thêm người dùng
          </button>
        </div>

        <div className={styles.tableWrap}>
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
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td className={styles.center}>{u.role}</td>
                  <td className={styles.center}>
                    <span className={`${styles.status} ${styles[u.status]}`}>
                      {u.status === "active" ? "Kích hoạt" : "Khóa"}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    <div className={styles.actionBox}>
                      <button
                        onClick={() => handleUpdateUser(u.id)}
                        className={styles.editBtn}
                      >
                        ✏️
                      </button>

                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={u.status === "active"}
                          onChange={() => toggleStatus(u.id)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Họ tên"
                value={currentUser.fullName}
                onChange={e =>
                  setCurrentUser({ ...currentUser, fullName: e.target.value })
                }
                required
              />

              <input
                placeholder="Email"
                value={currentUser.email}
                onChange={e =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                required
              />

              <select
                value={currentUser.role}
                onChange={e =>
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
              >
                <option>Ứng viên</option>
                <option>HR</option>
                <option>Phỏng vấn</option>
              </select>

              <div className={styles.modalActions}>
                <button type="button"
                 className={styles.btnCancel}
                   onClick={() => setShowForm(false)}>
                         Hủy
               </button>

             <button type="submit" className={styles.btnSave}>
                       Lưu thay đổi
            </button>
            </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
