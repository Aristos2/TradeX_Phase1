import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;