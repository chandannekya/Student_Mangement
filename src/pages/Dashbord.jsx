import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import StatsCards from "../Component/StatsCard";
import { AddStudentModel } from "../Component/AddStudentModel";
import { StudentTable } from "../Component/StudentTable";
import Charts from "../Component/Charts";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close modal on background click when /students/add is open
  useEffect(() => {
    if (location.pathname === "/students/add") {
      const closeModal = (e) => {
        if (e.target.id === "modalOverlay") {
          navigate("/students");
        }
      };
      window.addEventListener("click", closeModal);
      return () => window.removeEventListener("click", closeModal);
    }
  }, [location, navigate]);

  const handleLogout = () => {
    localStorage.setItem("token", "");
    window.location.reload();
  };

  return (
    <div className="flex flex-1 bg-gray-50 h-screen max-h-full">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        <div className="flex flex-col h-full pt-5">
          {/* Header */}
          <div className="flex items-center justify-between px-4 font-bold">
            ADMIN
            <button
              className="md:hidden text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              ✖
            </button>
          </div>

          <hr className="mt-4 border-gray-200" />

          {/* Navigation */}
          <nav className="flex flex-col flex-1 justify-between px-3 mt-6">
            <div className="space-y-2">
              <NavItem to="/" label="Dashboard" />
              <NavItem to="/students" label="Students" />
              <NavItem
                to="/students/add"
                label="Add Student"
                icon={<IoPersonAdd className="w-5 h-5 mr-4" />}
              />
            </div>

            <div className="mt-auto pb-4">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <CiLogout className="w-5 h-5 mr-4" /> Log out
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="p-6">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Welcome to the Dashboard</h1>
              <button
                className="p-4 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <StatsCards />

              {/* Routes Content */}
              <div className=" max-w-full mx-auto bg-white shadow-md rounded-lg p-6">
                <Routes>
                  <Route path="/" element={<Charts />} />
                  <Route
                    path="/students"
                    element={
                      <div className="">
                        {" "}
                        <StudentTable />
                      </div>
                    }
                  />
                  <Route path="/students/add" element={<AddStudentModel />} />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// NavLink wrapper for cleaner JSX
const NavItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-indigo-600 text-white"
          : "text-gray-900 hover:text-white hover:bg-indigo-600"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default Dashboard;
