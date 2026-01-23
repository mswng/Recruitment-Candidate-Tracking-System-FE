import React, { useState } from "react";
import styles from "./users.module.scss";

export default function UserManagement() {
 const [users, setUsers] = useState([
  { id: 1, fullName: "Nguyễn Văn A", email: "a@gmail.com", role: "candidate", status: "active" },
  { id: 2, fullName: "Trần Thị B", email: "b@gmail.com", role: "hr", status: "active" },
  { id: 3, fullName: "Lê Văn C", email: "c@gmail.com", role: "interviewer", status: "inactive" },
  { id: 4, fullName: "Phạm Đức D", email: "d@gmail.com", role: "candidate", status: "active" },
  { id: 5, fullName: "Hoàng Anh E", email: "e@gmail.com", role: "candidate", status: "active" },
  { id: 6, fullName: "Vũ Minh F", email: "f@gmail.com", role: "hr", status: "inactive" },
  { id: 7, fullName: "Ngô Thanh G", email: "g@gmail.com", role: "interviewer", status: "active" },
  { id: 8, fullName: "Đặng Thu H", email: "h@gmail.com", role: "candidate", status: "active" },
]);


  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "candidate",
  });

  const openAdd = () => {
    setForm({ fullName: "", email: "", role: "candidate" });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (u) => {
    setForm(u);
    setCurrentId(u.id);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (isEdit) {
      setUsers(users.map(u => (u.id === currentId ? { ...u, ...form } : u)));
    } else {
      setUsers([...users, { ...form, id: users.length + 1, status: "active" }]);
    }
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1></h1>
        <button className={styles.btnAdd} onClick={openAdd}>+ Thêm người dùng</button>
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
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>
           <span className={`${styles.badge} ${styles[u.role]}`}>
             {u.role}
           </span>
          </td>

                <td>
                  <span className={`${styles.status} ${styles[u.status]}`}>
                    {u.status === "active" ? "Kích hoạt" : "Vô hiệu"}
                  </span>
                </td>
                <td>
                  <button className={styles.btnSmall} onClick={() => openEdit(u)}>Sửa</button>
                  <button className={styles.btnSmall} onClick={() => toggleStatus(u.id)}>
                    {u.status === "active" ? "Vô hiệu" : "Kích hoạt"}
                  </button>
                  <button className={`${styles.btnSmall} ${styles.danger}`} onClick={() => deleteUser(u.id)}>
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
            <h2>{isEdit ? "Cập nhật người dùng" : "Thêm người dùng"}</h2>

            <div className={styles.formGroup}>
              <label>Họ và tên</label>
              <input value={form.fullName}
                onChange={e => setForm({ ...form, fullName: e.target.value })} />
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>

            <div className={styles.formGroup}>
              <label>Vai trò</label>
              <select value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="candidate">Ứng viên</option>
                <option value="hr">HR</option>
                <option value="interviewer">Interviewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className={styles.actions}>
              <button className={styles.btnSave} onClick={handleSave}>Lưu</button>
              <button className={styles.btnCancel} onClick={() => setShowModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
