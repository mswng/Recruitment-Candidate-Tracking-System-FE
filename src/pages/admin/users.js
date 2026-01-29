import { useEffect, useState } from "react";
import styles from "./users.module.scss";
import {
  getAdminUsers,
  updateUserInfo,
  updateUserStatus,
  addAdminUser,
} from "../../api/services/adminAPI";
import Pagination from "../../components/pagination/pagination";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    id: null,
    fullName: "",
    email: "",
    password: "",
    roles: ["CANDIDATE"],
  });

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const data = await getAdminUsers({ page, size: pageSize });
      setUsers(data.items || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // ================= ADD =================
  const handleAdd = () => {
    setIsEdit(false);
    setCurrentUser({
      id: null,
      fullName: "",
      email: "",
      password: "",
      roles: ["CANDIDATE"],
    });
    setShowForm(true);
  };

  // ================= EDIT =================
  const handleEdit = (u) => {
    setIsEdit(true);
    setCurrentUser({
      id: u.id,
      fullName: u.fullName,
      email: u.email,
      password: "",
      roles: u.roles || [],
    });
    setShowForm(true);
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = async (id) => {
    try {
      await updateUserStatus(id);
      setUsers(users =>
        users.map(u =>
          u.id === id
            ? {
                ...u,
                status: u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              }
            : u
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateUserInfo(currentUser.id, {
          fullName: currentUser.fullName,
          email: currentUser.email,
          roles: currentUser.roles,
        });
      } else {
        await addAdminUser({
          email: currentUser.email,
          fullName: currentUser.fullName,
          password: currentUser.password,
          roles: currentUser.roles,
        });
      }

      alert(isEdit ? "Cập nhật thành công" : "Thêm người dùng thành công");
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.userScope}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1></h1>
          <button onClick={handleAdd} className={styles.btnAdd}>
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
                  <td className={styles.center}>
                    {u.roles?.join(", ")}
                  </td>
                  <td className={styles.center}>
                    <span
                      className={`${styles.status} ${
                        styles[u.status?.toLowerCase()]
                      }`}
                    >
                      {u.status === "ACTIVE" ? "Kích hoạt" : "Khóa"}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    <div className={styles.actionBox}>
                      <button
                        onClick={() => handleEdit(u)}
                        className={styles.editBtn}
                      >
                        ✏️
                      </button>

                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={u.status === "ACTIVE"}
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

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* ================= MODAL ================= */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Họ tên"
                value={currentUser.fullName}
                onChange={e =>
                  setCurrentUser({
                    ...currentUser,
                    fullName: e.target.value,
                  })
                }
                required
              />

              <input
                placeholder="Email"
                value={currentUser.email}
                onChange={e =>
                  setCurrentUser({
                    ...currentUser,
                    email: e.target.value,
                  })
                }
                required
              />

              {!isEdit && (
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={currentUser.password}
                  onChange={e =>
                    setCurrentUser({
                      ...currentUser,
                      password: e.target.value,
                    })
                  }
                  required
                />
              )}

              <select
                value={currentUser.roles[0]}
                onChange={e =>
                  setCurrentUser({
                    ...currentUser,
                    roles: [e.target.value],
                  })
                }
              >
                <option value="CANDIDATE">Ứng viên</option>
                <option value="HR">HR</option>
                <option value="INTERVIEWER">Phỏng vấn</option>
                <option value="ADMIN">Admin</option>
              </select>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.btnCancel}
                  onClick={() => setShowForm(false)}
                >
                  Hủy
                </button>
                <button type="submit" className={styles.btnSave}>
                  {isEdit ? "Lưu" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
