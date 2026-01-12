export default function Sidebar() {
  return (
    <aside style={{
      width: "200px",
      backgroundColor: "#f5f6f8",
      padding: "16px",
      borderRight: "1px solid #e8e8e8"
    }}>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "8px 0" }}><a href="/">Dashboard</a></li>
          <li style={{ padding: "8px 0" }}><a href="/users">Users</a></li>
          <li style={{ padding: "8px 0" }}><a href="/pipeline">Pipeline</a></li>
          <li style={{ padding: "8px 0" }}><a href="/interviews">Interviews</a></li>
        </ul>
      </nav>
    </aside>
  );
}
