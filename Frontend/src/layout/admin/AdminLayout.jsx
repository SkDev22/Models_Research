import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Cards from "../../components/shared/Cards";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar className="w-64 fixed left-0 top-0 h-full bg-white shadow-lg" />

      {/* Main Content */}
      <div className="flex-1 p-3 ml-64 transition-all duration-300">
        <DashboardHeader />
        <Cards />
        <Outlet /> {/* This will render the dashboard and other admin pages */}
      </div>
    </div>
  );
};

export default AdminLayout;
