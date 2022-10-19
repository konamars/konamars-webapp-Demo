import AdminSideBar from "../components/AdminSideBar";
import { Outlet } from "@tanstack/react-location";

function Admin() {
  return (
    <div className="grid h-screen grid-cols-12">
      <div className="col-start-1 col-end-3 border border-r">
        <AdminSideBar />
      </div>
      <Outlet />
    </div>
  );
}

export default Admin;
