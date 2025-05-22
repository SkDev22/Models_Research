import { useState } from "react";
import { NavLink } from "react-router-dom";
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
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ${
        isOpen ? "w-50" : "w-16"
      } bg-gradient-to-b from-amber-100/40 to-amber-300/30 backdrop-blur-lg shadow-lg flex flex-col z-10`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <h2 className="text-gray-900 font-semibold text-lg">Dashboard</h2>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-900 transition-transform duration-300"
        >
          {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 mt-6 overflow-auto">
        <ul className="space-y-2">
          <SidebarLink
            to="/dashboard"
            icon={<IconHome size={17} />}
            label="Dashboard"
            isOpen={isOpen}
          />

          {/* Profile Section */}
          {/* <li>
            <NavLink
              to="#"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-900 hover:bg-amber-400/50 focus:outline-none`}
            >
              <div className="flex items-center space-x-3">
                <IconUser size={17} />
                {isOpen && <span className="font-semibold">Profile</span>}
              </div>
              {isOpen &&
                (isProfileOpen ? (
                  <IconChevronUp size={17} className="text-gray-600" />
                ) : (
                  <IconChevronDown size={17} className="text-gray-600" />
                ))}
            </NavLink>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isProfileOpen ? 1 : 0,
                height: isProfileOpen ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="pl-6"
            >
              {isProfileOpen && (
                <ul className="space-y-2">
                  <SidebarLink
                    to="/profile"
                    icon={<IconUserCircle size={17} />}
                    label="Personal Info"
                    isOpen={isOpen}
                    small
                  />
                  <SidebarLink
                    to="/profile/security"
                    icon={<IconLock size={17} />}
                    label="Security"
                    isOpen={isOpen}
                    small
                  />
                  <SidebarLink
                    to="/profile/preferences"
                    icon={<IconAdjustments size={17} />}
                    label="Preferences"
                    isOpen={isOpen}
                    small
                  />
                  <SidebarLink
                    to="/profile/documents"
                    icon={<IconFiles size={17} />}
                    label="Documents"
                    isOpen={isOpen}
                    small
                  />
                  <SidebarLink
                    to="/profile/billing"
                    icon={<IconCreditCard size={17} />}
                    label="Billing"
                    isOpen={isOpen}
                    small
                  />
                </ul>
              )}
            </motion.div>
          </li> */}

          {/* Listings */}
          {/* <li>
            <NavLink
              to="#"
              onClick={() => setIsManagementOpen(!isManagementOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-900 hover:bg-amber-400/50 focus:outline-none`}
            >
              <div className="flex items-center space-x-3">
                <IconListDetails size={17} />
                {isOpen && <span className="font-semibold">Listings</span>}
              </div>
              {isManagementOpen ? (
                <IconChevronUp size={17} className="text-gray-600" />
              ) : (
                <IconChevronDown size={17} className="text-gray-600" />
              )}
            </NavLink>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isManagementOpen ? 1 : 0,
                height: isManagementOpen ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="pl-6"
            >
              {isManagementOpen && (
                <ul className="space-y-2">
                  <SidebarLink
                    to="/listings/myListings"
                    icon={<IconClipboard size={17} />}
                    label="My Listings"
                    isOpen={isOpen}
                    small
                  />
                  <SidebarLink
                    to="/listings"
                    icon={<IconCash size={17} />}
                    label="Create Listing"
                    isOpen={isOpen}
                    small
                  />
                </ul>
              )}
            </motion.div>
          </li> */}

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
            to="/analytics"
            icon={<IconMessage size={17} />}
            label="Analytics"
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

          {/* Grouped Users Section */}
          {/* <li>
            <NavLink
              to="#"
              onClick={() => setIsUsersOpen(!isUsersOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-900 hover:bg-amber-400/50 focus:outline-none`}
            >
              <div className="flex items-center space-x-3">
                <IconUser size={17} />
                {isOpen && <span className="font-semibold">Users</span>}
              </div>
              {isUsersOpen ? (
                <IconChevronUp size={17} className="text-gray-600" />
              ) : (
                <IconChevronDown size={17} className="text-gray-600" />
              )}
            </NavLink>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isUsersOpen ? 1 : 0,
                height: isUsersOpen ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="pl-6"
            >
              {isUsersOpen && (
                <ul className="space-y-2">
                  <SidebarLink
                    to="/users/owners"
                    icon={<IconClipboard size={17} />}
                    label="Owners"
                    isOpen={isOpen}
                    small
                  />
                  <SidebarLink
                    to="/users/customers"
                    icon={<IconClipboard size={17} />}
                    label="Customers"
                    isOpen={isOpen}
                    small
                  />
                </ul>
              )}
            </motion.div>
          </li> */}

          {/* Grouped Management Section */}
          {/* <li>
            <NavLink
              to="#"
              onClick={() => setIsManagementOpen(!isManagementOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-900 hover:bg-amber-400/50 focus:outline-none`}
            >
              <div className="flex items-center space-x-3">
                <IconClipboard size={17} />
                {isOpen && <span className="font-semibold">Management</span>}
              </div>
              {isManagementOpen ? (
                <IconChevronUp size={17} className="text-gray-600" />
              ) : (
                <IconChevronDown size={17} className="text-gray-600" />
              )}
            </NavLink>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isManagementOpen ? 1 : 0,
                height: isManagementOpen ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="pl-6"
            >
              {isManagementOpen && (
                <ul className="space-y-2">
                  <SidebarLink
                    to="/bookings"
                    icon={<IconClipboard size={17} />}
                    label="Bookings"
                    isOpen={isOpen}
                    small
                  />
                  <SidebarLink
                    to="/payments"
                    icon={<IconCash size={17} />}
                    label="Payments"
                    isOpen={isOpen}
                    small
                  />
                  <SidebarLink
                    to="/reviews"
                    icon={<IconStar size={17} />}
                    label="Reviews"
                    isOpen={isOpen}
                    small
                  />
                  <SidebarLink
                    to="/analytics"
                    icon={<IconChartBar size={17} />}
                    label="Analytics"
                    isOpen={isOpen}
                    small
                  />
                </ul>
              )}
            </motion.div>
          </li> */}

          {/* <SidebarLink
            to="/settings"
            icon={<IconSettings size={17} />}
            label="Settings"
            isOpen={isOpen}
          /> */}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mb-6">
        <SidebarLink
          to="/logout"
          icon={<IconLogout size={22} />}
          label="Logout"
          isOpen={isOpen}
        />
      </div>
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
            ? "bg-amber-500 text-white font-semibold scale-105"
            : "text-gray-900 hover:bg-amber-400/50 hover:text-gray-900 hover:scale-105"
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
