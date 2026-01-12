import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";

export default function UserManagement() {
  return (
    <div>
      <Header />

      <div style={{ display: "flex", backgroundColor: "#f5f6f8" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: 24 }}>
          <h2>Quản lý người dùng</h2>

          <table
            width="100%"
            style={{
              background: "#fff",
              marginTop: 20,
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>admin@gmail.com</td>
                <td>Admin</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>hr@gmail.com</td>
                <td>HR</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
