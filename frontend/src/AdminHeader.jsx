import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
function AdminHeader() {
  const [adminId, setAdminId] = useState(null);
  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      const admin = JSON.parse(adminData);
      setAdminId(admin.id);
    }
  }, []);
  return <> {adminId ? <AdminDashboard /> : <AdminLogin />} </>;
}
export default AdminHeader;
