import React from "react";
import Header from "../header/Header";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";


export default function DashboardLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
