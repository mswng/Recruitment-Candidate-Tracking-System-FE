import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function AdminHome() {
  return (
    <div>
      {/* Header trên cùng của trang Admin */}
      <Header />

      {/* Khu vực nội dung chính */}
      <div style={{ display: "flex", backgroundColor: "#f5f6f8" }}>
        {/* Thanh sidebar bên trái */}
        <Sidebar />

        {/* Nội dung trung tâm */}
        <div style={{ flex: 1, padding: 24 }}>
          <h2>Admin Dashboard</h2>

          {/* Khu vực thống kê nhanh */}
          <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
            <div style={cardStyle}>
              <p>Total Users</p>
              <h3>120</h3>
            </div>

            <div style={cardStyle}>
              <p>Total Roles</p>
              <h3>4</h3>
            </div>

            <div style={cardStyle}>
              <p>Active Users</p>
              <h3>95</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Style cho các thẻ thống kê */
const cardStyle = {
  background: "#ffffff",
  padding: 20,
  borderRadius: 8,
  minWidth: 160,
};
