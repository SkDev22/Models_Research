import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  IconMenu2,
  IconX,
  IconHome,
  IconUser,
  IconSettings,
  IconMessage,
  IconLogout,
  IconClipboard,
  IconListDetails,
  IconCash,
  IconChartBar,
  IconStar,
  IconChevronDown,
  IconChevronUp,
  IconUserCircle,
  IconLock,
  IconAdjustments,
  IconFiles,
  IconCreditCard,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isManagementOpen, setIsManagementOpen] = useState(false); // Manage collapsible
  // const [isUsersOpen, setIsUsersOpen] = useState(false); // Users collapsible
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all text-white duration-300 ${
        isOpen ? "w-50" : "w-16"
      } backdrop-blur-lg bg-[#22223b] shadow-lg flex flex-col z-10`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <h2 className="text-white font-semibold text-lg">Dashboard</h2>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-900 transition-transform duration-300"
        >
          {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          <SidebarLink
            to="/dashboard"
            icon={<IconHome size={17} />}
            label="Dashboard"
            isOpen={isOpen}
          />

          <SidebarLink
            to="/profile"
            icon={<IconMessage size={17} />}
            label="Profile"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/message"
            icon={<IconMessage size={17} />}
            label="Messages"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/prediction"
            icon={<IconMessage size={17} />}
            label="Predict Bookings"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/listings"
            icon={<IconMessage size={17} />}
            label="Create Listing"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/view-listings"
            icon={<IconMessage size={17} />}
            label="My Listings"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/dynamic-pricing"
            icon={<IconMessage size={17} />}
            label="Price Allocator"
            isOpen={isOpen}
          />
        </ul>
      </nav>
      <div className="mb-6 ml-5">
        <Link to="/home">
          <h1 className="text-left">Home</h1>
        </Link>
        <h1 className="text-left">Logout</h1>
      </div>

      {/* Logout Button */}
      {/* <div className="mb-6">
        <SidebarLink
          to="/logout"
          icon={<IconLogout size={22} />}
          label="Logout"
          isOpen={isOpen}
        />
      </div> */}
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, isOpen, small }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
        ${
          isActive
            ? "bg-[#4a4e69] text-white font-semibold scale-90"
            : "text-white hover:bg-[#4a4e69] hover:text-white hover:scale-90"
        }`
      }
    >
      {icon}
      {isOpen && (
        <span
          className={`whitespace-nowrap ${
            small ? "text-sm font-normal" : "font-semibold"
          }`}
        >
          {label}
        </span>
      )}
    </NavLink>
  </li>
);

export default Sidebar;
