import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function AdminHome() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Content */}
      <div style={{ display: "flex", backgroundColor: "#f5f6f8" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div style={{ flex: 1, padding: 24 }}>
          <h2>Dashboard Admin</h2>

          {/* Thống kê */}
          <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
            <div style={cardStyle}>
              <p>Users</p>
              <h3>120</h3>
            </div>

            <div style={cardStyle}>
              <p>Roles</p>
              <h3>4</h3>
            </div>

            <div style={cardStyle}>
              <p>Active</p>
              <h3>95</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: 20,
  borderRadius: 8,
  minWidth: 160,
};
